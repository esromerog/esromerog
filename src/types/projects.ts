export interface ProjectMetadata {
    name: string
    tags: {
        name: string,
        show: boolean,
    }[]
    description: string
    role: string
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