import { createContentLoader, ContentData } from 'vitepress'

let data: ContentData[]

export { data }

export default createContentLoader('**/*.md', {
  transform(raw: ContentData[]) {
    return raw
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map(({ url, frontmatter, src }) => {
        return { url, frontmatter, src }
      })
  }
})
