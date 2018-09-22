import Component from '@ember/component';
import { inject as service } from '@ember/service'

export default Component.extend({
  router: service(),

  actions: {
    goToUser() {
      if (!this.router.currentRouteName.includes('update')) {
        this.router.transitionTo('user', this.userName);
      }
    }
  }
});
