import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import {
  createRestaurantDetailTemplate,
  createBannerElement,
  createSuggestElement,
  showToast,
  addReviewToDOM,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
    <div id="loading" class="loading">Loading...</div>
    <div id="error" class="error">An error occurred</div>
    <div class="container-detail">
      <div id="restaurant" class="restaurant-detail"></div>
    </div>
    <div id="toast" class="toast hide">
      <div id="toast-message"></div>
    </div>
    `;
  },

  async afterRender() {
    document.querySelector('#loading').style.display = 'block';
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);
      document.querySelector('#loading').style.display = 'none';
      const restaurantAll = await TheRestaurantDbSource.suggestRestaurant();
      const restaurantContainer = document.querySelector('#restaurant');
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
      document.querySelector('#banner-section').innerHTML = createBannerElement();
      restaurantAll.forEach((restaurantA) => {
        document.querySelector('#suggest-section').innerHTML += createSuggestElement(restaurantA);
      });
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('.favorite-btn-container'),
        restaurant: {
          id: restaurant.restaurant.id,
          name: restaurant.restaurant.name,
          city: restaurant.restaurant.city,
          rating: restaurant.restaurant.rating,
          pictureId: restaurant.restaurant.pictureId,
        },
      });
      document.querySelector('#error').style.display = 'none';
      const reviewForm = document.querySelector('#review-form');
      reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reviewerName = document.querySelector('#reviewer-name').value;
        const reviewText = document.querySelector('#review-text').value;

        const reviewData = {
          id: restaurant.restaurant.id,
          name: reviewerName,
          review: reviewText,
        };
        const reviewResponse = await TheRestaurantDbSource.addReview(reviewData);
        if (reviewResponse.error === false) {
          showToast('<i class="fa fa-info-circle"></i> Review berhasil ditambahkan');
          document.querySelector('#reviewer-name').value = '';
          document.querySelector('#review-text').value = '';
          const currentDate = new Date();
          const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
          reviewData.date = formattedDate;
          addReviewToDOM(reviewData);
        } else {
          showToast('<i class="fa fa-info-circle"></i> Gagal menambahkan review');
        }
      });
    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error.response && error.response.message) {
        errorMessage = error.response.message;
      }
      document.querySelector('#loading').style.display = 'none';
      document.querySelector('#error').textContent = errorMessage;
      document.querySelector('#error').style.display = 'block';
    }
  },
};

export default Detail;
