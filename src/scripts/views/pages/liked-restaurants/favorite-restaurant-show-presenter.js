class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const movies = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(movies);
  }

  _displayRestaurants(movies) {
    this._view.showFavoriteRestaurants(movies);
  }
}

export default FavoriteRestaurantShowPresenter;
