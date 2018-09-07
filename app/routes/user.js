import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({

  ajax: service(),

  model(params) {
    return this.get('ajax').request(`https://rust.swigglemeister.com/users/${params.user_name}`)
  },

  setupController(controller, model) {
    controller.set('model', model);
  }
});
