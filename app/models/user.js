import DS from 'ember-data';

export default DS.Model.extend({
  avatar: DS.attr('string'),
  list: DS.attr(),
});
