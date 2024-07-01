import fg from 'fast-glob'
import { UserConfig } from 'vitepress'
import { DefaultTheme } from 'vitepress/theme'

const files = fg.sync('./*.ts', { cwd: 'docs/.vitepress/config/options' })

const config: UserConfig<DefaultTheme.Config> = {}

for (const f of files) {
  const mod = await import(`./options/${f}`).then(m => m.default)
  Object.assign(config, mod)
}

export default config
