import React from "react";
import { GroceryItem } from "../types/types";
import "../css/ItemCard.css";

type CardProps = {
  name: string,
  barcode: string,
  size: string,
  image_url: string,
  brands: string
}

const ItemCard = ({ name, barcode, size, image_url, brands }: CardProps) => {
  console.log("ItemCard", name)
  return (
    <section className="product">
      <div className="product__photo">
        <div className="photo-container">
          <div className="photo-main">
            <img src={image_url} alt="green apple slice" />
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
        <form>
          <div className="container">
            <label htmlFor="inp" className="inp">
              <input type="text" id="inp" placeholder="&nbsp;" />
              <span className="label">Price</span>
            </label>
            <label htmlFor="inp" className="inp">
              <input type="text" id="inp" placeholder="&nbsp;" />
              <span className="label">Coupon</span>
              <span className="focus-bg"></span>
            </label>
          </div>
        </form>
        <button className="buy--btn">ADD TO HISTORY</button>

      </div>
    </section>
  );
}

export default ItemCard;