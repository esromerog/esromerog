
async function getMetadata(slug) {
  const { metadata } = await import(`@/content/${slug}.mdx`)
  return { slug, metadata }
}

export async function getAllProjectMetadata(slugs) {
  return Promise.all(slugs.map(({slug})=>getMetadata(slug)))
}