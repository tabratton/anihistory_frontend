import Model, { attr } from '@ember-data/model';

export default Model.extend({
  avatar: attr('string'),
  list: attr(),
})
