import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  ajax: service(),
  i18n: service(),

  message: null,
  showToast: false,
  type: null,

  actions: {
    updateUser() {
      this.get('ajax').post(`https://rust.swigglemeister.com/users/${this.userName}`, {
        dataType: 'text'
      })
        .then(() => {
          this.set('message', this.i18n.t('messages.user-loading').toString());
          this.set('type', 'success');
          this.set('showToast', true);
        }, error => {
          this.set('message', error.status === 404 ? this.i18n.t('messages.not_found').toString() : this.i18n.t('messages.unavail').toString());
          this.set('type', 'error');
          this.set('showToast', true);
        });
    },

    clearToast() {
      this.set('showToast', false);
    }
  }
});
