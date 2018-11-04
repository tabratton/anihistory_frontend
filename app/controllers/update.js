import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { translationMacro as t } from 'ember-intl';

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
          this.set('message', t('messages.user_loading'));
          this.set('type', 'success');
          this.set('showToast', true);
        }, error => {
          this.set('message', error.status === 404 ? t('messages.not_found') : t('messages.unavail'));
          this.set('type', 'error');
          this.set('showToast', true);
        });
    },

    clearToast() {
      this.set('showToast', false);
    }
  }
});
