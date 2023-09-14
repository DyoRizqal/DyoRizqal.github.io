import CONFIG from '../../globals/config';

function generateStars(rating) {
  let stars = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - rating < 1) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  toastMessage.innerHTML = message;
  toast.classList.remove('hide');
  setTimeout(() => {
    toast.classList.add('hide');
  }, 3000);
}

function addReviewToDOM(reviewData) {
  const reviewSection = document.querySelector('#review-section .review-section');
  const newReview = document.createElement('div');
  newReview.className = 'review-card';

  newReview.innerHTML = `
    <div class="review-header">
      <span class="reviewer-name">${reviewData.name}</span>
      <span class="review-date">${reviewData.date}</span>
    </div>
    <p class="review-content">${reviewData.review}</p>
  `;

  reviewSection.insertBefore(newReview, document.getElementById('review-form'));
}

const createSuggestElement = (restaurant) => `
  <div class="restaurant-card">
    <a href="/#/detail/${restaurant.id}">
      <img src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}"" alt="${restaurant.name}" loading="lazy" class="lazyload">
      <div class="restaurant-card-content">
        <h2>${restaurant.name}</h2>
        <p class="city">${restaurant.city}</p>
        <p class="rating">⭐️${restaurant.rating}</p>
      </div>
    </a>
  </div>
`;

const createBannerElement = () => `
    <div class="menu-container">
      <div class="text-banner">
        <h4>Clean Stay for Your Worry-Free Journey</h4>
        <p>Enjoy your foood with a peace of mind as your health and safety are guaranteed through these standardized protocols.</p>
      </div>
      <div class="detail-banner">
        <div class="circle"></div>
        <div class="detail-content">
          <h5>CleanAccommodation</h5>
          <p>CHSE-certified accommodations for applying hygiene protocol from Kemenparekra</p>
          <div class="additional-features">
            <div class="feature-item"><i class="fa fa-pump-medical"></i> Frequent Disinfection</div>
            <div class="feature-item"><i class="fa fa-head-side-mask"></i> Staff Trained in Health Protocol</div>
            <div class="feature-item"><i class="fa fa-temperature-half"></i> Temperature Check</div>
          </div>
        </div>
      </div>
    </div>
`;

const createRestaurantDetailTemplate = (restaurants) => `<img src="${restaurants.pictureId ? CONFIG.BASE_IMAGE_URL + restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="${restaurants.name}" loading="lazy" class="lazyload">
  <div class="info-heading">
    <h1>${restaurants.name}</h1>
    <p>${restaurants.address}, ${restaurants.city}</p>
  </div>
  <div class="info-container">
    <div class="right-box-container"> 
      <div class="right-box">
          <h3><i class="fa fa-info-circle"></i> Description</h3>
          <p class="description">${restaurants.description}</p>
          <div class="menu-container">
            <div class="food-box">
              <h4><i class="fa fa-utensils"></i> Foods</h4>
              <ul>
                ${restaurants.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
              </ul>
            </div>
            <div class="drink-box">
              <h4><i class="fa fa-coffee"></i> Drinks</h4>
              <ul>
                ${restaurants.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
              </ul>
            </div>
          </div>
      </div>
      <div class="right-box-2" id="banner-section"></div>
      <div class="right-box-3" id="review-section">
          <div class="review-section">
            <h3 class="review-name">Customer Reviews</h3>
            ${restaurants.customerReviews.map((review) => `
              <div class="review-card">
                <div class="review-header">
                  <span class="reviewer-name">${review.name}</span>
                  <span class="review-date">${review.date}</span>
                </div>
                <p class="review-content">${review.review}</p>
              </div>
            `).join('')}
            <form id="review-form">
              <input type="text" id="reviewer-name" placeholder="Your Name">
              <textarea id="review-text" placeholder="Your Review"></textarea>
              <input type="hidden" id="restaurant-id" value="${restaurants.id}">
              <button type="submit">Submit</button>
            </form>
          </div>
      </div>
      <div class="right-box-4" id="suggest-section"></div>
    </div>
    <div class="left-box">
        <div class="ratings-div">
            <p id="starRating">${restaurants.rating}/5 <span class="count-review">(${restaurants.customerReviews ? restaurants.customerReviews.length : '0'} Review)</span></p>
            <p class="stars-icon">${generateStars(restaurants.rating)}</p>
        </div>
        <div class="category-container">
          ${restaurants.categories.map((cat) => `<span class="category-box"><i class="fa fa-tags"></i>${cat.name}</span>`).join(' ')}
        </div>
         <div class="favorite-btn-container"></div>
    </div>
  </div>  
`;

const createRestaurantItemTemplate = (restaurant) => `
<div class="restaurant-card">
  <a href="/#/detail/${restaurant.id}">
    <img src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}"" alt="${restaurant.name}" loading="lazy" class="lazyload">
    <div class="restaurant-card-content">
      <h2>${restaurant.name}</h2>
      <p class="city">${restaurant.city}</p>
      <p class="rating">⭐️${restaurant.rating}</p>
    </div>
  </a>
</div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="favorite-btn">
    <i class="far fa-heart-o" aria-hidden="true"></i> Add to Favorite
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="favorite-btn">
    <i class="fas fa-heart" aria-hidden="true"></i> Added to Favorite
  </button>
`;

export {
  createBannerElement,
  createSuggestElement,
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  generateStars,
  showToast,
  addReviewToDOM,
};
