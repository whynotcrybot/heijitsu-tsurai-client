const npsUtils = require('nps-utils')

const { rimraf, crossEnv, series, concurrent } = npsUtils

module.exports = {
  scripts: {
    build: {
      description: 'Build for production.',
      default: series.nps('clean', 'build.build'),
      build: 'webpack'
    },
    clean: {
      description: 'Clean dist folder.',
      default: rimraf('dist')
    },
    default: {
      description: 'Start project.',
      script: `${crossEnv('NODE_ENV=production')} node dist/index.bundle.js`
    },
    dev: {
      start: {
        description: 'Start project on dev environment.',
        script: `${crossEnv('NODE_ENV=development')} nodemon -q dist/index.bundle.js`
      },
      default: {
        script: concurrent.nps('dev.watch', 'dev.start')
      },
      watch: {
        description: 'Webpack watches and compiles the project.',
        script: 'webpack -w'
      }
    },
    lint: {
      default: 'eslint source',
      fix: 'eslint --fix source'
    },
    test: {
      default: `${crossEnv('NODE_ENV=test')} mocha $(find __tests__ -name *.test.js) --colors --compilers js:babel-register`,
      watch: series.nps('test -w')
    }
  }
}
