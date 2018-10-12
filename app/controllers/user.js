import Controller from '@ember/controller';

export default Controller.extend({

  sortingOptions: null,
  languageOptions: null,
  sort: 'desc',
  lang: 'user',

  init() {
    this._super(...arguments);
    this.sortingOptions = ['desc', 'asc'];
    this.languageOptions = ['user', 'english', 'romaji', 'native'];
  },

  setSort(sort) {
    this.set('sort', sort);
  },

  setLang(lang) {
    this.set('lang', lang);
  },
});
