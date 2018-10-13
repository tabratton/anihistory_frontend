import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service'

export default Component.extend({

  i18n: service(),

  classNames: ['language-select'],

  locales: computed('i18n.{locale,locales}', function() {
    const i18n = this.i18n;
    return this.get('i18n.locales').map(loc => {
      return {
        id: loc,
        text: i18n.t('language-select.language.' + loc) };
    });
  }),

  setLocale(value) {
    this.set('i18n.locale', value);
  },

});
