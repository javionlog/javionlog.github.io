import fg from 'fast-glob'
import { UserConfig } from 'vitepress'
import { DefaultTheme } from 'vitepress/theme'

const config: UserConfig<DefaultTheme.Config> = {}
const files = fg.sync('./*.ts', { cwd: 'docs/.vitepress/config/options' })
const promiseList = []

for (const file of files) {
  promiseList.push(
    import(`./options/${file}`).then((mod: { default: typeof config }) => mod.default)
  )
}
const mods = await Promise.all(promiseList)
for (const mod of mods) {
  Object.assign(config, mod)
}

export default config
