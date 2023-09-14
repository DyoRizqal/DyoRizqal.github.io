import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListBrowser = {
  async render() {
    return `
      <div id="loading" class="loading">Loading...</div>
      <div id="error" class="error">An error occurred</div>
      <img src="./images/heros/hero-image_4.jpg" alt="Hero Image" class="hero-image">
      <div class="content">
        <h2 class="content__heading">Explore Your Taste</h2>
        <div id="restaurants" class="restaurant-list">
        </div>
      </div>
    `;
  },

  async afterRender() {
    try {
      document.querySelector('#loading').style.display = 'block';
      const restaurants = await TheRestaurantDbSource.listBrowserRestaurants();
      document.querySelector('#loading').style.display = 'none';
      const restaurantsContainer = document.querySelector('#restaurants');
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
      document.querySelector('#error').style.display = 'none';
    } catch (error) {
      document.querySelector('#loading').style.display = 'none';

      const errorMessage = error.response ? error.response.message : 'An unknown error occurred';
      document.querySelector('#error').textContent = errorMessage;
      document.querySelector('#error').style.display = 'block';
    }
  },

};

export default ListBrowser;
