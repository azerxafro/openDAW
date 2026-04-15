import {CloudHandler} from "./CloudHandler"
import {createClient, SupabaseClient} from "@supabase/supabase-js"
import {panic} from "@opendaw/lib-std"
import {Promises} from "@opendaw/lib-runtime"

export class SupabaseHandler implements CloudHandler {
    readonly #client: SupabaseClient
    
    constructor() {
        // Safe-guards and fallback constants for local testing. In reality these must be defined in Vercel VITE_ envs.
        const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || "https://xxx.supabase.co"
        const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || "xxx"
        
        this.#client = createClient(supabaseUrl, supabaseAnonKey)
    }

    async alive(): Promise<void> {
        // Will throw if not authenticated
        const { data: { session }, error } = await this.#client.auth.getSession()
        if (error || !session) {
            return Promise.reject("Not authenticated or session expired")
        }
    }

    async delete(path: string): Promise<void> {
        const { data: { session } } = await this.#client.auth.getSession()
        const { error } = await this.#client.storage
            .from("lucid-projects")
            .remove([`${session?.user.id}/${path}`])
            
        if (error) throw new Error(error.message)
    }

    async download(path: string): Promise<ArrayBuffer> {
        const { data: { session } } = await this.#client.auth.getSession()
        const { data, error } = await this.#client.storage
            .from("lucid-projects")
            .download(`${session?.user.id}/${path}`)
            
        if (error || !data) panic(error?.message ?? "Failed to download")
        
        return await data.arrayBuffer()
    }

    async exists(path: string): Promise<boolean> {
        const { data: { session } } = await this.#client.auth.getSession()
        
        // Supabase doesn't have an exact "exists" check without downloading or listing,
        // so we just query the exact prefix and check if length > 0
        const dir = path.substring(0, path.lastIndexOf('/'));
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        
        const { data, error } = await this.#client.storage
            .from("lucid-projects")
            .list(`${session?.user.id}/${dir}`, { search: fileName })
            
        if (error) return false;
        return (data && data.length > 0)
    }

    async list(path?: string): Promise<string[]> {
        const { data: { session } } = await this.#client.auth.getSession()
        const safePath = path ? `${session?.user.id}/${path}` : `${session?.user.id}`
        
        const { data, error } = await this.#client.storage
            .from("lucid-projects")
            .list(safePath)
            
        if (error) throw new Error(error.message)
        
        return (data || []).map(file => file.name)
    }

    async upload(path: string, data: ArrayBuffer): Promise<void> {
        const { data: { session }, error: authError } = await this.#client.auth.getSession()
        if (!session) throw new Error("Unauthorized");

        const { error } = await this.#client.storage
            .from("lucid-projects")
            .upload(`${session.user.id}/${path}`, data, {
                upsert: true,
                contentType: 'application/octet-stream'
            })
            
        if (error) throw new Error(error.message)
    }
}
