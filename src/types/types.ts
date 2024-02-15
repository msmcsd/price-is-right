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

export const DefaultGroceryItem : GroceryItem = {
  name: "",
  barcode: "",
  brand: "",
  size: "",
  price: 0,
  coupon: 0,
  image_url: "",
  date: new Date()
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

export enum ManageItemMode {
  Add,
  Edit
}

export type ManageItemProps = {
  item: GroceryItem,
  mode: ManageItemMode
}

export type MongoDBInsertOneResult = {
  acknowledged: boolean,
  insertedId?: string
}