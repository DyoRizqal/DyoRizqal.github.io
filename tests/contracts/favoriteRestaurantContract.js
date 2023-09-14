const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    favoriteRestaurant.putRestaurant({ id: 1, name: 'Restaurant A' });
    favoriteRestaurant.putRestaurant({ id: 2, name: 'Restaurant B' });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1, name: 'Restaurant A' });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2, name: 'Restaurant B' });
    expect(await favoriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });

  it('can return all of the restaurants that have been added', async () => {
    favoriteRestaurant.putRestaurant({ id: 1, name: 'Restaurant A' });
    favoriteRestaurant.putRestaurant({ id: 2, name: 'Restaurant B' });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1, name: 'Restaurant A' }, { id: 2, name: 'Restaurant B' }]);
  });

  it('should not add a restaurant if it does not have an id', async () => {
    favoriteRestaurant.putRestaurant({ name: 'Restaurant C' });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it('should not add a restaurant if it already exists', async () => {
    favoriteRestaurant.putRestaurant({ id: 1, name: 'Restaurant A' });
    favoriteRestaurant.putRestaurant({ id: 1, name: 'Restaurant A' });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1, name: 'Restaurant A' }]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
