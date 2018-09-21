'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    amcharts4: {
      files: [
        'charts',
        'themes/animated',
        'themes/kelly'
      ]
    },
    'ember-cli-babel': {
      includePolyfill: true
    },
    'ember-date-fns': {
      includedDateFns: [
        'parse',
        'compare_asc',
        'compare_desc',
        'is_equal',
        'add_days',
        'sub_days'
      ],
    }
  });

  app.import('node_modules/spectre.css/dist/spectre.css');
  app.import('node_modules/spectre.css/dist/spectre-exp.css');
  app.import('node_modules/spectre.css/dist/spectre-icons.css');

  return app.toTree();
};
