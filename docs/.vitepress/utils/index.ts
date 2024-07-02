export const pascalToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase())
}

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
