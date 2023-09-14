import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../src/scripts/views/templates/template-creator';

describe('Integration Tests for Restaurant App', () => {
  function setup() {
    document.body.innerHTML = '<div id="app-root"></div>';
  }

  beforeEach(() => {
    setup();
  });

  it('Should display "Add to Favorite" on initial like button', () => {
    document.querySelector('#app-root').innerHTML = createLikeButtonTemplate();
    const buttonHTML = document.querySelector('.favorite-btn').innerHTML.trim();
    expect(buttonHTML).toContain('Add to Favorite');
  });

  it('Should display "Added to Favorite" on liked button', () => {
    document.querySelector('#app-root').innerHTML = createLikedButtonTemplate();
    const buttonHTML = document.querySelector('.favorite-btn').innerHTML.trim();
    expect(buttonHTML).toContain('Added to Favorite');
  });
});
