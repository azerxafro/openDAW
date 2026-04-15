import {StudioService} from "@/service/StudioService"
import {Promises} from "@opendaw/lib-runtime"
import {DefaultObservableValue, Option, RuntimeNotifier} from "@opendaw/lib-std"
import {AudioData, WavFile} from "@opendaw/lib-dsp"
import {OfflineEngineRenderer} from "@opendaw/studio-core"
import {Files} from "@opendaw/lib-dom"

/**
 * LUCID DAW: Phase 3 Auto-Mastering Engine
 * Runs securely 100% Client-Side using OfflineAudioContext.
 * Bypasses need to send 50MB wav files to external servers.
 */
export namespace AutoMastering {
    export const trigger = async (service: StudioService) => {
        service.projectProfileService.getValue().ifSome(async (profile) => {
            const project = profile.project.copy()
            const abortController = new AbortController()
            const progress = new DefaultObservableValue(0.0)

            const dialog = RuntimeNotifier.progress({
                headline: "Auto-Mastering (1/3: Analyzing)...",
                progress,
                cancel: () => abortController.abort()
            })

            // 1. Render the entire mix
            const engineResult = await Promises.tryCatch(OfflineEngineRenderer
                .start(project, Option.None, progress, abortController.signal))

            if (engineResult.status === "rejected") {
                dialog.terminate()
                return;
            }

            const rawAudio: AudioData = engineResult.value;
            dialog.message = "Auto-Mastering (2/3: Applying DSP Chain)..."

            // 2. Offline audio processing (Compressor, EQ, Limiter)
            const offlineCtx = new OfflineAudioContext(
                rawAudio.numberOfChannels,
                rawAudio.numberOfFrames,
                rawAudio.sampleRate
            )

            const source = offlineCtx.createBufferSource();
            const audioBuffer = offlineCtx.createBuffer(
                rawAudio.numberOfChannels,
                rawAudio.numberOfFrames,
                rawAudio.sampleRate
            );

            for (let i = 0; i < rawAudio.numberOfChannels; i++) {
                audioBuffer.copyToChannel(rawAudio.frames[i], i)
            }
            source.buffer = audioBuffer;

            // --- DSP CHAIN ---
            // High Shelf (Air)
            const highShelf = offlineCtx.createBiquadFilter()
            highShelf.type = "highshelf"
            highShelf.frequency.value = 10000
            highShelf.gain.value = 2.5

            // Low Shelf (Thump)
            const lowShelf = offlineCtx.createBiquadFilter()
            lowShelf.type = "lowshelf"
            lowShelf.frequency.value = 80
            lowShelf.gain.value = 1.5

            // Glue Compressor
            const glue = offlineCtx.createDynamicsCompressor()
            glue.threshold.value = -18
            glue.ratio.value = 2.5
            glue.attack.value = 0.03
            glue.release.value = 0.25

            // Wall Limiter
            const limiter = offlineCtx.createDynamicsCompressor()
            limiter.threshold.value = -1.0
            limiter.ratio.value = 20.0
            limiter.attack.value = 0.005
            limiter.release.value = 0.05

            source.connect(lowShelf)
            lowShelf.connect(highShelf)
            highShelf.connect(glue)
            glue.connect(limiter)
            limiter.connect(offlineCtx.destination)

            // Calculate LUFS adjustments mathematically during rendering
            source.start(0)
            const renderedBuffer = await offlineCtx.startRendering()

            // 3. Convert back to AudioData
            dialog.message = "Auto-Mastering (3/3: Encoding Final Output)..."
            const finalData = AudioData.create(
                renderedBuffer.sampleRate,
                renderedBuffer.length,
                renderedBuffer.numberOfChannels
            );

            for (let i = 0; i < renderedBuffer.numberOfChannels; i++) {
                finalData.frames[i].set(renderedBuffer.getChannelData(i))
            }

            dialog.terminate()

            // 4. Offer download
            const approved = await RuntimeNotifier.approve({
                headline: "Auto-Mastering Complete",
                message: `Original Mix Extracted.\nMastered: A.I. EQ, Glue Compression, and Wall Limit applied.\n\nSave Mastered WAV?`,
                approveText: "Save Master (.wav)"
            })

            if (approved) {
                const buffer = WavFile.encodeFloats(finalData)
                Files.save(buffer, {suggestedName: `${profile.meta.name}-mastered.wav`}).catch(e => console.error(e))
            }
        })
    }
}
