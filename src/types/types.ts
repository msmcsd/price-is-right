export type GroceryItem = {
  barcode: string,
  name: string,
  price: number,
  coupon: number,
  date: Date,
  image_url: string,
  size: string
}

export type FoodApiResult = {
  code: string,
  product : {
    product_name: string,
    image_front_url: string,
    brands: string,
    quantity: string
  },
  status: number
  status_verbose: string,
}