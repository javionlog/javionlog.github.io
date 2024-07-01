import fg from 'fast-glob'
import { listToTree } from './index'

const files = fg.sync('**/!(index.md)', {
  onlyFiles: false,
  cwd: 'docs',
  ignore: ['.vitepress', 'public']
})

const textMap: Record<string, string> = {
  frontend: '前端',
  computer: '计算机',
  algorithm: '算法',
  'data-structure': '数据结构'
}

const pickTreeProps = (
  tree: any[],
  props: string[],
  maxLevel = 2,
  childrenKey = 'items',
  linkKey = 'link'
) => {
  for (const item of tree) {
    for (const k of Object.keys(item)) {
      if (!props.includes(k)) {
        Reflect.deleteProperty(item, k)
      }
    }
    if (item.level >= maxLevel) {
      Reflect.deleteProperty(item, childrenKey)
    }
    if (item[childrenKey]?.length > 0) {
      Reflect.deleteProperty(item, linkKey)
      pickTreeProps(item[childrenKey], props, maxLevel, childrenKey)
    }
  }
  return tree
}

export const getNavData = (maxLevel = 2) => {
  const tmpList = files.map(fileName => {
    const splitList = fileName.split('/')
    const last = splitList[splitList.length - 1]
    const text = last.replace('.md', '')
    const item = {
      id: last,
      parentId: splitList.length === 1 ? null : splitList[splitList.length - 2],
      level: splitList.length,
      link: `/${fileName}`,
      activeMatch: `/${fileName}`,
      text: textMap[text] ?? text,
      items: []
    }
    return item
  })
  const toTreeProps = {
    parentId: 'parentId',
    childrenId: 'id',
    childrenKey: 'items'
  }
  const result = pickTreeProps(
    listToTree(tmpList, toTreeProps),
    ['text', 'link', 'level', 'activeMatch', toTreeProps.childrenKey],
    maxLevel
  )
  return result
}
