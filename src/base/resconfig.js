/**
 * @author userjustdoit
 * @des  资源配置路径
 */

const config = require('../../config')

module.exports = {
    staticPath:process.env.NODE_ENV === 'production'? config.build.assetsPublicPath+config.build.assetsSubDirectory
      : config.dev.assetsPublicPath+config.dev.assetsSubDirectory,
}
