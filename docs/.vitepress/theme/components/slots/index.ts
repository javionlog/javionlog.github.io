import { Component } from 'vue'

import { pascalToKebab } from '@/utils/index'

interface CompItem {
  name: string
  mod: Component
}

const modules = import.meta.glob('./**/*.vue', { eager: true, import: 'default' })

const compList: CompItem[] = []

for (const [name, mod] of Object.entries(modules)) {
  compList.push({ name, mod: mod as Component })
}

const includeSlots: string[] = []

const compMapList: CompItem[] = compList
  .map(item => ({
    name: pascalToKebab(item.name.split('/').pop()?.split('.').shift() as string),
    mod: item.mod
  }))
  .filter(o => includeSlots.includes(o.name))

export default compMapList
