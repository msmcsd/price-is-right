import { FormEventHandler } from "react";
import { GroceryItem } from "../types/types";
import NumericField from "./NumericField";
import editIcon from "../images/edit.png";
import "../css/ProductInfo.css";

type ProductInfoProps = {
  item: GroceryItem,
  handlePriceChange: FormEventHandler,
  handleCouponChange: FormEventHandler,
  handleEditItem: FormEventHandler,
  addHistory: FormEventHandler
}

const ProductInfo = ({item, handlePriceChange, handleCouponChange, handleEditItem, addHistory} : ProductInfoProps) => {
  return (
    <div className="product-info">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="title">
          <h1>{item?.name}</h1>
          <span className="barcode">{item?.barcode}</span>
        </div>
        <img className="edit-icon" src={editIcon} onClick={handleEditItem} />
      </div>
      <div className="description">
        <h3>INFO</h3>
        <ul>
          <li>Manufactured by {item?.brand}</li>
          <li>{item?.size}</li>
        </ul>
      </div>

      <form onSubmit={addHistory}>
        <div className="container">
          <NumericField label="Price" required handleChange={handlePriceChange} />
          <NumericField label="Coupon" handleChange={handleCouponChange} />
        </div>
        <div className="red-btn-container">
          <input type="submit" className="red-btn" value="Add Price" />
        </div>
      </form>

    </div>
  )
}

export default ProductInfo;