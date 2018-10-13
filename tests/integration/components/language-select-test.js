import { module, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | language-select', function(hooks) {
  setupRenderingTest(hooks);

  skip('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{language-select}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#language-select}}
        template block text
      {{/language-select}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
