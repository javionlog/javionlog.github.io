type treeKey = number | string

export const pascalToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
}

export const treeToList = <T extends Record<PropertyKey, unknown>>(
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

export const listToTree = <
  T extends {
    [key: treeKey]: unknown
  }
>(
  list: T[] = [],
  props = { parentId: 'parentId', childrenId: 'id', childrenKey: 'children' }
) => {
  const { parentId, childrenId, childrenKey } = props
  const result = [] as (
    | T
    | {
        [K in typeof childrenKey]: T
      }
  )[]
  const pIdMap: {
    [key: treeKey]: T
  } = {}

  for (const item of list) {
    pIdMap[item[childrenId] as treeKey] = item
  }

  for (const item of list) {
    if (item[parentId]) {
      const mapIem = pIdMap[item[parentId] as treeKey] as {
        [key: treeKey]: T[]
      }
      if (Array.isArray(mapIem[childrenKey])) {
        mapIem[childrenKey].push(pIdMap[item[childrenId] as treeKey])
      } else {
        mapIem[childrenKey] = [pIdMap[item[childrenId] as treeKey]]
      }
    } else {
      result.push(pIdMap[item[childrenId] as treeKey])
    }
  }

  return result
}
