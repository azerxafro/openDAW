"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultInstrumentFactory = void 0;
var studio_adapters_1 = require("@opendaw/studio-adapters");
var DefaultPlayfieldAttachment_1 = require("@/ui/defaults/DefaultPlayfieldAttachment");
var DefaultInstrumentFactory;
(function (DefaultInstrumentFactory) {
    DefaultInstrumentFactory.create = function (api, factory) {
        if (factory === studio_adapters_1.InstrumentFactories.Playfield) {
            api.createInstrument(studio_adapters_1.InstrumentFactories.Playfield, { attachment: DefaultPlayfieldAttachment_1.DefaultPlayfieldAttachment });
        }
        else {
            api.createAnyInstrument(factory);
        }
    };
})(DefaultInstrumentFactory || (exports.DefaultInstrumentFactory = DefaultInstrumentFactory = {}));
