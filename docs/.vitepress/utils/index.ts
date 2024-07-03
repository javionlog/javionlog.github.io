/**
 * 大驼峰字符串转横线连接
 * @param {string} str
 * @returns {string}
 */
export const pascalToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
}

/**
 * 树形结构数组扁平化
 * @param {Array} tree
 * @param {Object} props
 * @returns {Array}
 */
export const treeToList = <T extends Record<PropertyKey, any>>(
  tree: T[] = [],
  props = { childrenKey: 'children', isDepthFirst: true }
) => {
  const { childrenKey, isDepthFirst } = props
  const stack = tree.slice()
  const result: T[] = []
  while (stack.length > 0) {
    const topItem = stack.shift()
    if (topItem) {
      result.push(topItem)
      const children = topItem[childrenKey]
      if (Array.isArray(children)) {
        if (isDepthFirst) {
          stack.unshift(...children)
        } else {
          stack.push(...children)
        }
      }
    }
  }
  return result
}

/**
 * 扁平数组转树形结构
 * @param {Array} list
 * @param {Object} props
 * @returns {Array}
 */
export const listToTree = <T extends Record<PropertyKey, any>>(
  list: T[] = [],
  props = { parentId: 'parentId', childrenId: 'id', childrenKey: 'children' }
) => {
  const { parentId, childrenId, childrenKey } = props
  const result: T[] = []
  const pIdMap: {
    [k: PropertyKey]: T
  } = {}

  for (const item of list) {
    pIdMap[item[childrenId]] = item
  }

  for (const item of list) {
    if (item[parentId]) {
      const mapIem = pIdMap[item[parentId]] as {
        [k: PropertyKey]: T[]
      }
      if (Array.isArray(mapIem[childrenKey])) {
        mapIem[childrenKey].push(pIdMap[item[childrenId] as PropertyKey])
      } else {
        mapIem[childrenKey] = [pIdMap[item[childrenId] as PropertyKey]]
      }
    } else {
      result.push(pIdMap[item[childrenId] as PropertyKey])
    }
  }

  return result
}

export const parseTime = (time: Date | string | number, format = '{y}/{m}/{d} {h}:{i}:{s}') => {
  if (time === '' || time === undefined) {
    return ''
  }
  const date = new Date(time)
  const result = format.replace(/{([ymdhis]){1}}/g, (_, k) => {
    const formatMap: Record<string, number> = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds()
    }
    const str = formatMap[k]
    return str.toString().padStart(2, '0')
  })
  return result
}
