const assert = require('assert');

// Feature('Liking Restaurant');

// Before(({ I }) => {
//   I.amOnPage('/');
// });

// Scenario('Show no liked restaurant', ({ I }) => {
//   I.amOnPage('/#/like');
//   I.see('List Not Found', 'h2');
// });

// Scenario('Like a restaurant', async ({ I }) => {
//   I.amOnPage('/');
//   I.seeElement('.restaurant-card a');
//   I.click(locate('.restaurant-card a').first());

//   I.seeElement('.restaurant-card-content h2');
//   const title = await I.grabTextFrom(locate('.restaurant-card-content h2').first());

//   I.seeElement('.favorite-btn-container');
//   I.seeElement('.favorite-btn');
//   I.click(locate('.favorite-btn').first());

//   I.amOnPage('/#/like');
//   I.seeElement('.card');
//   const likedTitle = await I.grabTextFrom(locate('.title').first());

//   assert.strictEqual(title, likedTitle.trim());
// });

// Scenario('Unlike the restaurant', async ({ I }) => {
//   I.amOnPage('/');
//   I.seeElement('.restaurant-card a');
//   I.click(locate('.restaurant-card a').first());

//   I.seeElement('.restaurant-card-content h2');
//   const title = await I.grabTextFrom(locate('.restaurant-card-content h2').first());

//   I.seeElement('.favorite-btn-container');
//   I.seeElement('.favorite-btn');
//   I.click(locate('.favorite-btn').first());

//   I.amOnPage('/#/like');
//   I.seeElement('.card');
//   const likedTitle = await I.grabTextFrom(locate('.title').first());

//   assert.strictEqual(title, likedTitle.trim());

//   I.amOnPage('/#/like');
//   I.seeElement('.card');

//   I.seeElement('.restaurant-card a');
//   I.click(locate('.restaurant-card a').first());

//   I.seeElement('.favorite-btn-container');
//   I.seeElement('.favorite-btn');
//   I.click(locate('.favorite-btn').first());

//   I.amOnPage('/#/like');
//   I.see('List Not Found', 'h2');
// });

Feature('Restaurant Detail and Liking');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('View restaurant detail', async ({ I }) => {
  I.click(locate('.restaurant-card a').first());
  I.seeElement('.restaurant-detail');
  I.seeElement('.favorite-btn');
  I.see('Add to Favorite', { css: '.favorite-btn' });
});

Scenario('Like and unlike a restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.click(locate('.restaurant-card a').first());
  const title = await I.grabTextFrom('.info-heading h1');
  I.seeElement('.favorite-btn');
  I.see('Add to Favorite', { css: '.favorite-btn' });
  I.click(locate('.favorite-btn').first());
  I.see('Added to Favorite', { css: '.favorite-btn' });
  I.amOnPage('/#/like');
  I.seeInCurrentUrl('/#/like');
  I.seeElement('.restaurant-card');
});

Scenario('View restaurant list', async ({ I }) => {
  I.seeElement('.restaurant-card a');
});

Scenario('Navigate to favorite restaurant list', async ({ I }) => {
  I.click('Liked Restaurant');
});

Scenario('Add a new review to a restaurant', async ({ I }) => {
  I.click(locate('.restaurant-card a').first());
  I.fillField('#reviewer-name', 'Testing E2E');
  I.fillField('#review-text', 'This restaurant is great!');
  I.click('Submit');
  I.see('Testing E2E', { css: '.reviewer-name' });
  I.see('This restaurant is great!', { css: '.review-content' });
  I.amOnPage('/');
});
