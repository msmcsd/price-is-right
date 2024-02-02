import NumericField from "./NumericField"
import "../css/ItemCard.css"
import InputField from "./InputField"
import { useState } from "react"
import { GroceryItem } from "../types/types"
import { addItem } from "../database"

const AddItem = () => {
  const [name, setName] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<number>(0);

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPrice(Number(e.currentTarget.value))
  }

  const handleCouponChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCoupon(Number(e.currentTarget.value))
  }

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product: GroceryItem = {
      name: name,
      barcode: barcode,
      brand: brand,
      size: size,
      price: price,
      coupon: coupon,
      image_url: "",
      date: new Date()
    }

    const result = await addItem(product);
    console.log("Add item result", result)
  }

  return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            {/* <img src={item.image_url} alt={item.name} /> */}
          </div>
          <div className="photo-album">
          </div>
        </div>
      </div>
      <div className="product__info">
        <form onSubmit={handleAddItem}>
          <div className="container">
            <InputField label="Name" required={true}
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>
            <InputField label="Barcode" required={true}
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBarcode(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>
            <InputField label="Manufactured By" required={true}
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBrand(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>
          </div>
          <div className="container">
            <InputField label="Size/Weight"
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setSize(e.currentTarget.value as string)}
              handleInput={() => { }} />
            <NumericField label="Price" handleChange={handlePriceChange} />
            <NumericField label="Coupon" handleChange={handleCouponChange} />
          </div>
          <input type="submit" className="buy--btn" value="ADD ITEM" />
        </form> 

      </div>
    </section>
  )
}

export default AddItem;