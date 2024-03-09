export interface ApiDish {
  title: string;
  price: number;
  image: string;
}

export interface Dish extends ApiDish {
  id: string;
}

export interface  ApiDishes {
  [id: string]: ApiDish;
}

export interface DishForm {
  title: string;
  price: string;
  image: string;
}

export interface FetchError {
  code: string;
}

export interface UpdateDishParams {
  dishId: string;
  apiDish: ApiDish;
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface ApiOrder {
  [id: string]: number;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface NewOrder {
  [id: string]: CartDish[]
}

