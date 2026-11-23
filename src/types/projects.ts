export type ProjectFilter = "games-art" | "science" | "education"

export interface ProjectMetadata {
    name: string
    tags: {
        name: string,
        show: boolean,
    }[]
    description: string
    role: string
    /** Hides the project from the projects page while it has no content. */
    draft?: boolean
    /** Filter chips on the projects page this project appears under. */
    filters?: ProjectFilter[]
    /** Card image (path under /public). Cards without one render text-only. */
    thumbnail?: string
    /** Where the card's arrow goes instead of /projects/<slug> (e.g. an itch.io page). */
    href?: string
    /** "YYYY" or "YYYY-MM" */
    start: string
    /** "YYYY" or "YYYY-MM", or "present" if ongoing. */
    end?: string
    cv?: {
        role: string
        name?: string
        org: string
        orgUrl?: string
        summary?: string
        bullets?: { text: string, categories?: string[] }[]
        categories?: string[]
        priority?: number
        links?: { label: string, url: string }[]
    }
    links: {
        url: string
        label: string
    }[]
}

export function defineMetadata(meta: ProjectMetadata): ProjectMetadata {
  return meta
}