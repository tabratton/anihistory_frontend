import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | amchart-chart', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{amchart-chart}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#amchart-chart}}
        template block text
      {{/amchart-chart}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
