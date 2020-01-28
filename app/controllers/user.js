import Controller from '@ember/controller'
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'

export default class UserController extends Controller {

  sortingOptions
  languageOptions

  @tracked sort
  @tracked lang

  constructor() {
    super(...arguments)

    this.sort = 'desc'
    this.lang = 'user'

    this.sortingOptions = ['desc', 'asc']
    this.languageOptions = ['user', 'english', 'romaji', 'native']
  }

  get modelPresent() {
    return !!this.model
  }

  @action setSort(sort) {
    this.sort = sort
  }

  @action setLang(lang) {
    this.lang = lang
  }
}
