import build from './build'
import markdown from './markdown'
import meta from './meta'
import router from './router'
import theme from './theme'
import vite from './vite'
import vue from './vue'

const mergeConfig = Object.assign({}, build, markdown, meta, router, theme, vite, vue)

export default mergeConfig
