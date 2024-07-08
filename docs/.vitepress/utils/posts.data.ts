import { createContentLoader, ContentData } from 'vitepress'
import { execSync } from 'node:child_process'
import { parseTime } from './index'
import { getPackageJson } from './theme'

type ContentReturnData = ContentData & {
  author: string
  lastUpdated: string
}

const getGitCommitTime = (path: string) => {
  try {
    const filePath = `docs/src${path.replace('.html', '.md')}`
    const commitTime = execSync(`git log -1 --format=%cd --date=iso -- ${filePath}`)
      .toString()
      .trim()
    return parseTime(commitTime)
  } catch {
    return ''
  }
}

let data: ContentReturnData[]

export { data }

export default createContentLoader('**/*.md', {
  transform(raw: ContentData[]) {
    const { author } = getPackageJson()
    return raw
      .filter(item => {
        return item.url.endsWith('.html')
      })
      .map(item => {
        return {
          ...item,
          author,
          lastUpdated: getGitCommitTime(item.url)
        }
      })
      .sort((a, b) => {
        return +new Date(b.lastUpdated) - +new Date(a.lastUpdated)
      })
  }
})
