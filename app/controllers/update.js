import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  ajax: service(),
  message: null,
  showToast: false,
  type: null,

  actions: {
    updateUser() {
      this.get('ajax').post(`https://rust.swigglemeister.com/users/${this.userName}`, {
        dataType: 'text'
      })
        .then(() => {
          this.set('message', 'User loading, it may take a minute or two to load all data');
          this.set('type', 'success');
          this.set('showToast', true);
        }, error => {
          this.set('message', error.status === 404 ? 'User not found in Anilist' : 'Service Unavailable');
          this.set('type', 'error');
          this.set('showToast', true);
        });
    },

    clearToast() {
      this.set('showToast', false);
    }
  }
});
