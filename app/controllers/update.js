import Controller from '@ember/controller'
import { action } from '@ember/object'
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking'
import fetch from 'fetch';

export default class UpdateController extends Controller {

  @service intl

  @tracked message
  @tracked type
  @tracked showToast = false

  @action updateUser() {
    fetch(`https://rust.swigglemeister.com/users/${this.userName}`, {
      method: 'POST'
    })
      .then(() => {
        this.message = this.intl.t('messages.user_loading')
        this.type = 'success'
        this.showToast = true
      })
      .catch(error => {
        this.message = error.status === 404 ? this.intl.t('messages.not_found') : this.intl.t('messages.unavail')
        this.type = 'error'
        this.showToast = true
      })
  }

  @action clearToast() {
    this.showToast = false
  }
}
