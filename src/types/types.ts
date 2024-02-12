export type GroceryItem = {
  _id?: string,
  barcode: string,
  name: string,
  price: number,
  coupon: number,
  date: Date,
  image_url: string,
  size: string,
  brand: string
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

export type DeleteItemResult = {
  acknowledged: boolean,
  deletedCount: number
}

export type AddItemProps = {
  name?: string,
  barcode?: string,
  brand?: string,
  size?: string,
  imageURL?: string
}

export type MongoDBInsertOneResult = {
  acknowledged: boolean,
  insertedId?: string
}