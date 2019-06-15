import { A } from '@ember/array'
import Route from '@ember/routing/route'
import { inject as service } from '@ember/service'

export default class ApplicationRoute extends Route {
  @service intl

  beforeModel() {
    const locales = A(navigator.languages).addObject('en-US')
    this.intl.setLocale(locales)
  }

}
