import { FormEventHandler } from "react";
import "../css/ItemCard.css";
import NumericField from "./NumericField";

type CardProps = {
  name: string,
  barcode: string,
  size: string,
  image_url: string,
  brands: string,
  handlePriceChange: FormEventHandler,
  handleCouponChange: FormEventHandler,
  addHistory: FormEventHandler
}

const ItemCard = ({ name, barcode, size, image_url, brands, handlePriceChange, handleCouponChange, addHistory }: CardProps) => {

   return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            <img src={image_url} alt={name} />
          </div>
          <div className="photo-album">
          </div>
        </div>
      </div>
      <div className="product__info">
        <div className="title">
          <h1>{name}</h1>
          <span>{barcode}</span>
        </div>
        <div className="description">
          <h3>INFO</h3>
          <ul>
            <li>Manufactured by {brands}</li>
            <li>{size}</li>
          </ul>
        </div>
        <div className="variant">

        </div>
        <form onSubmit={addHistory}>
          <div className="container">
            <NumericField label="Price" handleChange={handlePriceChange} />
            <NumericField label="Coupon" handleChange={handleCouponChange} />
          </div>
          <input type="submit" className="buy--btn" value="ADD TO HISTORY" />
        </form>

      </div>
    </section>
  );
}

export default ItemCard;