'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    amcharts4: {
      files: [
        'charts',
        'themes/animated',
        'themes/kelly',
        'themes/spiritedaway',
        'themes/dataviz',
        'themes/moonrisekingdom',
        'themes/frozen'
      ]
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    intl: {
      defaultLocale: 'en'
    },
  })

  app.import('node_modules/spectre.css/dist/spectre.css')
  app.import('node_modules/spectre.css/dist/spectre-exp.css')
  app.import('node_modules/spectre.css/dist/spectre-icons.css')

  return app.toTree()
}
