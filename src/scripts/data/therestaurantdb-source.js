import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async listBrowserRestaurants() {
    const response = await fetch(API_ENDPOINT.NOW_PLAYING);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async suggestRestaurant() {
    const allRestaurants = await this.listBrowserRestaurants();
    const shuffled = allRestaurants.sort(() => 0.5 - Math.random());
    const selectedRestaurants = shuffled.slice(0, 3);
    return selectedRestaurants;
  }

  static async upcomingRestaurants() {
    const response = await fetch(API_ENDPOINT.UPCOMING);
    const responseJson = await response.json();
    return responseJson.results;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const restaurants = await response.json();
    return restaurants;
  }

  static async addReview(reviewData) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const responseJson = await response.json();
    return responseJson;
  }
}

export default TheRestaurantDbSource;
