import { useEffect, useState } from "react";
import InputField from "../InputField";
import ProductPhoto from "../ProductPhoto";
import NumericField from "../NumericField";
import { DefaultInventoryItem, InventoryItem, ManageInventoryItemProps, ManageItemMode, MongoDBInsertOneResult, MongoDBUpdateResult, UpdateInventoryItemProps } from "../../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { addInventoryItem, updateInventoryItem } from "../../services/inventory";
import { URL } from "../../constants/URL";

const ManageInventoryItem = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  let item: InventoryItem = DefaultInventoryItem;

  const [name, setName] = useState<string>(item.name);
  const [barcode, setBarcode] = useState<string>(item.barcode);
  const [image_url, setImageUrl] = useState<string>(item.image_url);
  const [count, setCount] = useState<number>(item.count);
  const [exp_date, setExpDate] = useState<Date>(new Date());
  const [isAddMode, setIsAddMode] = useState<boolean>(true);

  useEffect(() => {
    if (state !== null) {
      const { item, mode } = state as ManageInventoryItemProps;
      const isAdd = mode === ManageItemMode.Add;
      setIsAddMode(isAdd);
      setBarcode(item.barcode);

      if (!isAdd) {
        setBarcode(item.barcode);
        setName(item.name);
        setCount(item.count);
        setImageUrl(item.image_url);
      }
    }
  }, []);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product: InventoryItem = {
      name: name,
      barcode: barcode,
      count: count,
      image_url: image_url,
      expiration_date: exp_date
    }

    if (isAddMode) {
      const result: MongoDBInsertOneResult = await addInventoryItem(product);
      console.log("Add inventory item result", result)

      if (result && result.acknowledged && result.insertedId) {
        navigate(URL.Inventory);
      }
    }
    else {
      // const props: UpdateInventoryItemProps = {
      //   item: product
      // }
      const result: MongoDBUpdateResult = await updateInventoryItem(product);
      console.log("Edit inventory item result", result)

      if (result && result.acknowledged && result.modifiedCount) {
        navigate(URL.Inventory);
      }
    }
  }

  const handleCountChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCount(Number(e.currentTarget.value))
  }

  return (
    <section className="product" >
      <ProductPhoto url={image_url} description={name} />
      <div className="product-details">
        <form onSubmit={handleAddItem}>
          <div className="container">
            <InputField label="Name" required
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value as string)}
              value={name}
              handleInput={() => { }} />

            <InputField label="Barcode" required
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setBarcode(e.currentTarget.value as string)}
              value={barcode}
              handleInput={() => { }} />

            <NumericField label="Count" required
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setCount(Number(e.currentTarget.value))}/>

            <InputField label="Expiration Date"
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setExpDate(new Date(e.currentTarget.value))}
              value={exp_date.toString()}
              handleInput={() => { }} />

            <InputField label="Image URL"
              handleChange={(e: React.FormEvent<HTMLInputElement>) => setImageUrl(e.currentTarget.value as string)}
              value={image_url}
              handleInput={() => { }} />

            <div className="red-btn-container">
              <input type="submit" className="red-btn" value={isAddMode ? "Add Inventory" : "Update Inventory"} />
            </div>
          </div>
        </form>

      </div>
    </section>
  )
}

export default ManageInventoryItem;