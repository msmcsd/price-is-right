import { FormEventHandler } from "react";
import "../css/ItemCard.css";
import NumericField from "./NumericField";
import { GroceryItem } from "../types/types";

type CardProps = {
  item: GroceryItem
  handlePriceChange: FormEventHandler,
  handleCouponChange: FormEventHandler,
  addHistory: FormEventHandler
}

const ItemCard = ({ item, handlePriceChange, handleCouponChange, addHistory }: CardProps) => {

   return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
             <img src={item.image_url} alt={item.name} />
          </div>
        </div>
      </div>
      <div className="product__info">
        <div className="title">
           <h1>{item.name}</h1>
           <span>{item.barcode}</span>
        </div>
        <div className="description">
          <h3>INFO</h3>
          <ul>
             <li>Manufactured by {item.brand}</li>
            <li>{item.size}</li>
          </ul>
        </div>
        <div className="variant">

        </div>
        <form onSubmit={addHistory}>
          <div className="container">
            <NumericField label="Price" required handleChange={handlePriceChange} />
            <NumericField label="Coupon" handleChange={handleCouponChange} />
          </div>
          <input type="submit" className="buy--btn" value="ADD TO HISTORY" />
        </form>

      </div>
    </section>
  );
}

export default ItemCard;