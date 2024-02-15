import NumericField from "./NumericField"
import "../css/ItemCard.css"
import InputField from "./InputField"
import { useEffect, useState } from "react"
import { ManageItemProps, GroceryItem, MongoDBInsertOneResult, ManageItemMode, DefaultGroceryItem, MongoDBUpdateResult, UpdateItemProps } from "../types/types"
import { addItem, updateItem } from "../database"
import { useLocation, useNavigate } from "react-router-dom"
import { URL } from "../constants/URL"

/*
// Used to Add or Edit an item.
*/

const ManageItem = () => {
  const navigate = useNavigate();

  const {state} = useLocation();

  let item : GroceryItem = DefaultGroceryItem;

  const [name, setName] = useState<string>(item.name);
  const [barcode, setBarcode] = useState<string>(item.barcode);
  const [brand, setBrand] = useState<string>(item.brand);
  const [size, setSize] = useState<string>(item.size);
  const [price, setPrice] = useState<number>(item.price);
  const [coupon, setCoupon] = useState<number>(item.coupon);
  const [imageURL, setImageURL] = useState<string>(item.image_url);
  const [isAddMode, setIsAddMode] = useState<boolean>(true);
  const [oldBarcode, setOldBarcode] = useState<string>(item.barcode);

  useEffect(() => {
    if (state !== null) {
      const { item, mode } = state as ManageItemProps;
      const isAdd = mode === ManageItemMode.Add;
      setIsAddMode(isAdd);
      setBarcode(item.barcode);

      if (!isAdd) {
        setOldBarcode(item.barcode);
        setName(item.name);
        setBrand(item.brand);
        setSize(item.size);
        setImageURL(item.image_url);
      }
    }
  }, []);

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPrice(Number(e.currentTarget.value))
    
  }

  const handleCouponChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCoupon(Number(e.currentTarget.value))
  }

  const handleImageULRChange = (e: React.FormEvent<HTMLInputElement>) => {
    setImageURL(e.currentTarget.value)
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
      image_url: imageURL,
      date: new Date()
    }

    if (isAddMode) {
      const result: MongoDBInsertOneResult = await addItem(product);
      console.log("Add item result", result)

      if (result && result.acknowledged && result.insertedId) {
        navigate(URL.LoadItemBase + barcode);
      }
    }
    else {
      const props : UpdateItemProps = {
        item: product,
        oldBarcode: oldBarcode
      }
      const result: MongoDBUpdateResult= await updateItem(props);
      console.log("Edit item result", result)

      if (result && result.acknowledged && result.modifiedCount) {
        navigate(URL.LoadItemBase + barcode);
      }    
    }
  }

  return (
    <section className="product" style={{width: "700px", height: "480px", margin: "100px auto auto auto"}}>
      <div className="product__photo" style={{width: "300px", height:"480px"}}>
        <div className="photo-container">
          <div className="photo-main">
            <img src={imageURL} alt={name} style={{ maxWidth: '100%', maxHeight: "100%" , objectFit: "contain"}} />
          </div>
        </div>
      </div>
      <div className="product__info" style={{ paddingLeft: "0px" }}>
        <form onSubmit={handleAddItem}>
          <div className="container" style={{height: "500px"}}>
            <InputField label="Name" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value as string)} 
                        value={name}
                        handleInput={()=>{}}/>
            <InputField label="Barcode" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBarcode(e.currentTarget.value as string)} 
                        value={barcode}
                        handleInput={()=>{}}/>
            <InputField label="Manufactured By" required
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setBrand(e.currentTarget.value as string)} 
                        value={brand}
                        handleInput={()=>{}}/>

            <InputField label="Size/Weight"
                        handleChange={(e: React.FormEvent<HTMLInputElement>) => setSize(e.currentTarget.value as string)}
                        value={size}
                        handleInput={() => { }} />

            {isAddMode && <NumericField label="Price" required handleChange={handlePriceChange} />}
            {isAddMode && <NumericField label="Coupon" handleChange={handleCouponChange} />}
            
            <InputField label="Image URL" 
                        handleChange={handleImageULRChange} 
                        value={imageURL}
                        handleInput={() => { }} />
            <input type="submit" className="buy--btn" value={isAddMode ? "Add Item" : "Update Item"} style={{ margin: "30px" }} />
          </div>
        </form> 

      </div>
    </section>
  )
}

export default ManageItem;