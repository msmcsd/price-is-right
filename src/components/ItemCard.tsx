import { FormEventHandler } from "react";
import "../css/ItemCard.css";
import NumericField from "./NumericField";
import { DefaultGroceryItem, GroceryItem, ManageItemMode, ManageItemProps } from "../types/types";
import editIcon from "../images/edit.png";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants/URL";
import ProductPhoto from "./ProductPhoto";
import ProductInfo from "./ProductInfo";

type CardProps = {
  item: GroceryItem
  handlePriceChange: FormEventHandler,
  handleCouponChange: FormEventHandler,
  addHistory: FormEventHandler
}

const ItemCard = ({ item, handlePriceChange, handleCouponChange, addHistory }: CardProps) => {
  const navigate = useNavigate();

  const handleEditItem = () => {
    const props: ManageItemProps = {
      item: item,
      mode: ManageItemMode.Edit
    }
    navigate(URL.EditItemBase + item?.barcode, { state: props });
  }

  return (
    <section className="product" style={{ marginTop: "100px" }}>
      <ProductPhoto url={item?.image_url} description={item?.name} />
      <ProductInfo item={item} 
                   handleCouponChange={handleCouponChange}
                   handleEditItem={handleEditItem}
                   handlePriceChange={handlePriceChange}
                   addHistory={addHistory} />
     </section>
  );
}

export default ItemCard;