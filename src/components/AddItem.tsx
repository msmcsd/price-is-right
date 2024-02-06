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
  const [itemImage, setItemImage] = useState<string | null>(null);

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

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.target.files?.length)
  //   if (event.target.files && event.target.files[0]) {
  //     console.log(event.target.files[0])
  //     await setItemImage(URL.createObjectURL(event.target.files[0]));
  //   }
  // };

  return (
    <section className="product" style={{width: "700px", height: "550px", margin: "0px"}}>
      <div className="product__photo" style={{width: "300px", height:"480px"}}>
        <div className="photo-container">
          <div className="photo-main">
            {/* <div>
              <label className="buy--btn" htmlFor="browse-image">Add Image</label>
              <input id="browse-image" 
                     type="file" 
                     style={{display: "none"}} 
                     onChange={handleImageUpload} 
                     onClick={e=>e.currentTarget.value=''}/>
              <input type="button" className="buy--btn" value="CLEAR" onClick={() => setItemImage(null)} />
            </div> */}
            {itemImage && (
              <div>
                <img src={itemImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
              </div>
            )}
          </div>
          {/* <div className="photo-album">
          </div> */}
        </div>
      </div>
      <div className="product__info" style={{ paddingLeft: "0px" }}>
        <form onSubmit={handleAddItem}>
          <div className="container" style={{height: "500px"}}>
            <InputField label="Name" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>
            <InputField label="Barcode" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBarcode(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>
            <InputField label="Manufactured By" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBrand(e.currentTarget.value as string)} 
                        handleInput={()=>{}}/>

            <InputField label="Size/Weight"
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setSize(e.currentTarget.value as string)}
              handleInput={() => { }} />
            <NumericField label="Price" required handleChange={handlePriceChange} />
            <NumericField label="Coupon" handleChange={handleCouponChange} />
            <NumericField label="Image URL" handleChange={handleCouponChange} />
            <input type="submit" className="buy--btn" value="ADD ITEM" style={{ margin: "30px" }} />
          </div>
        </form> 

      </div>
    </section>
  )
}

export default AddItem;