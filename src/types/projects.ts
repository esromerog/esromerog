export interface ProjectMetadata {
    name: string
    tags: {
        name: string,
        show: boolean,
    }[]
    description: string
    role: string
    year: number
    links: {
        url: string
        label: string
    }[]
}

export function defineMetadata(meta: ProjectMetadata): ProjectMetadata {
  return meta
}