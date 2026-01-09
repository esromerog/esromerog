import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default markdown elements with custom styling
    h1: ({ children }) => (
      <h1 className="mdx-h1">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mdx-h2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mdx-h3">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mdx-p">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noopener noreferrer" className="mdx-link">
        {children}
      </a>
    ),
    img: (props) => (
      <img
        {...props}
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    ...components,
  }
}
