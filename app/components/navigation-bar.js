import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({

  i18n: service(),
  router: service(),

  actions: {
    goToUser() {
      const user = this.userName;
      this.set('userName', null);
      this.router.transitionTo('user', user);
    }
  }
});
