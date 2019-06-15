import Controller from '@ember/controller'
import { inject as service } from '@ember/service'

export default Controller.extend({

  ajax: service(),
  intl: service(),

  message: null,
  showToast: false,
  type: null,

  actions: {
    updateUser() {
      this.ajax.post(`https://rust.swigglemeister.com/users/${this.userName}`, {
        dataType: 'text'
      })
        .then(() => {
          this.set('message', this.intl.t('messages.user_loading'))
          this.set('type', 'success')
          this.set('showToast', true)
        })
        .catch(error => {
          this.set('message', error.status === 404 ? this.intl.t('messages.not_found') : this.intl.t('messages.unavail'))
          this.set('type', 'error')
          this.set('showToast', true)
        })
    },

    clearToast() {
      this.set('showToast', false)
    }
  }
})
