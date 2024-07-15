import { readFileSync } from 'node:fs'

import fg from 'fast-glob'
import { DefaultTheme } from 'vitepress'

import { commom, nav } from '../lang'
import { listToTree } from './index'

type NavItem = DefaultTheme.NavItem & {
  id: string
  parentId: string | null
  level: number
  activeMatch: string
  items: NavItem[]
  [k: string]: any
}

type PackageJson = {
  author: string
}

/**
 * 获取所有文件的路径
 * @returns {Array}
 */
const getFilePaths = fg
  .sync('**/!(index.md)', {
    onlyFiles: false,
    cwd: 'docs/src',
    ignore: ['.vitepress', 'public']
  })
  .filter(fileName => !fileName.endsWith('.ts'))

/**
 * 过滤树形结构数组属性
 * @param {Array} tree
 * @param {Array} props
 * @param {number} maxLevel
 * @param {string} childrenKey
 * @param {string} linkKey
 * @returns {Array}
 */
const pickTreeProps = (
  tree: NavItem[],
  props: string[],
  { maxLevel = 2, childrenKey = 'items', linkKey = 'link' }
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
    const itemChildren = item[childrenKey] as NavItem[] | undefined
    if (Array.isArray(itemChildren) && itemChildren.length) {
      Reflect.deleteProperty(item, linkKey)
      pickTreeProps(itemChildren, props, { maxLevel, childrenKey })
    }
  }
  return tree
}

/**
 * 获取导航栏数据
 * @param {number} maxLevel
 * @returns {Array}
 */
export const getNavData = (maxLevel = 2) => {
  const tmpList = getFilePaths.map(fileName => {
    const splitList = fileName.split('/')
    const last = splitList[splitList.length - 1]
    const text = last.replace('.md', '')
    const finalText = nav[fileName.replace('.md', '')] ?? commom[text]
    const item: NavItem = {
      id: last,
      parentId: splitList.length === 1 ? null : splitList[splitList.length - 2],
      level: splitList.length,
      link: `/${fileName}`,
      activeMatch: `/${fileName}`,
      text: finalText ?? text,
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
  const includeProps = [
    'text',
    'link',
    'level',
    'activeMatch',
    'collapsed',
    toTreeProps.childrenKey
  ]
  const result = pickTreeProps(listToTree(tmpList, toTreeProps), includeProps, { maxLevel })
  return result
}

/**
 * 获取侧边栏数据
 * @param {number} maxLevel
 * @returns {Object}
 */
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

/**
 * 获取 package.json 内容
 * @returns {Object}
 */
export const getPackageJson = () => {
  const pkgJsonPath = 'package.json'
  const result = JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as PackageJson
  return result
}
