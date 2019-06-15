import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import Component from '@glimmer/component'
import { tracked } from '@glimmer/tracking'

export default class NavigationBar extends Component {

  @service router

  @tracked userName

  @action goToUser() {
    const user = this.userName
    this.userName = ''
    this.router.transitionTo('user', user)
  }
}
