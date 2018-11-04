import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { translationMacro as t } from 'ember-intl';

export default Component.extend({

  intl: service(),

  classNames: ['language-select'],

  locales: computed('intl.{locale,locales}', function() {
    return this.intl.locales.map(loc => {
      debugger;
      return {
        id: loc,
        text: t('language-select.language.' + loc) };
    });
  }),

  setLocale(value) {
    this.intl.setLocale(value);
  },

});
