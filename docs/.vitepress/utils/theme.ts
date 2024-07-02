import type { DefaultTheme } from 'vitepress'
import fg from 'fast-glob'
import { listToTree } from './index'
import { commom } from '../lang'

type NavItem = DefaultTheme.NavItem & {
  id: string
  parentId: string | null
  level: number
  activeMatch: string
  items: NavItem[]
  [k: string]: any
}

const files = fg.sync('**/!(index.md)', {
  onlyFiles: false,
  cwd: 'docs',
  ignore: ['.vitepress', 'public']
})

const pickTreeProps = (
  tree: Array<NavItem>,
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
    const item: NavItem = {
      id: last,
      parentId: splitList.length === 1 ? null : splitList[splitList.length - 2],
      level: splitList.length,
      link: `/${fileName}`,
      activeMatch: `/${fileName}`,
      text: commom[text] ?? text,
      collapsed: false,
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
    ['text', 'link', 'level', 'activeMatch', 'collapsed', toTreeProps.childrenKey],
    maxLevel
  )
  return result
}

export const getSidebarData = (maxLevel = 4) => {
  const tmpList = getNavData(maxLevel)
  const result: {
    [k: string]: NavItem[]
  } = {}
  for (const item of tmpList) {
    for (const subItem of item.items) {
      result[subItem.activeMatch] = subItem.items
    }
  }
  return result
}
