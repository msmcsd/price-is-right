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
      {/* <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            <img src={item?.image_url} alt={item?.name} />
          </div>
        </div>
      </div> */}
      <ProductPhoto url={item?.image_url} description={item?.name} />
      <ProductInfo item={item} 
                   handleCouponChange={handleCouponChange}
                   handleEditItem={handleEditItem}
                   handlePriceChange={handleCouponChange}
                   addHistory={addHistory} />
      {/* <div className="product__info">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="title">
            <h1>{item?.name}</h1>
            <span>{item?.barcode}</span>
          </div>
          <img src={editIcon}
            onClick={handleEditItem}
            style={{ width: "32px", height: "32px", cursor: "pointer" }} />
        </div>
        <div className="description">
          <h3>INFO</h3>
          <ul>
            <li>Manufactured by {item?.brand}</li>
            <li>{item?.size}</li>
          </ul>
        </div>
        <div className="variant">

        </div>
        <form onSubmit={addHistory}>
          <div className="container">
            <NumericField label="Price" required handleChange={handlePriceChange} />
            <NumericField label="Coupon" handleChange={handleCouponChange} />
          </div>
          <input type="submit" className="buy--btn" value="Add Price" />
        </form>

      </div> */}
    </section>
  );
}

export default ItemCard;