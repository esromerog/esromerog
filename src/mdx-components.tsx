import type { MDXComponents } from 'mdx/types'
import Image, {ImageProps} from 'next/image'
import { Publication } from './_components/Publication'

const components = {
  Publication,
  h1: ({children}) => (
    <h1>{children}</h1>
  ),
  h2: ({children}) => (
    <h2>{children}</h2>
  ),
  img: (props) => (
    <Image {...(props as ImageProps)} className='projects-image' />
  )
} satisfies MDXComponents
 
export function useMDXComponents(): MDXComponents {
  return components
}