import React from "react";
import "./ItemLookup.css";
import { GroceryItem } from "../types/types";
import ItemCard_Old from "./ItemCard_Old";

type ItemHistoryProps = {
  histories: GroceryItem[]
}

const ItemHistory = (prop: ItemHistoryProps) => {
  const item: GroceryItem = prop.histories[0];
console.log(item)
  return (
    <div>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-6">Date</div>
          <div className="col col-3">List Price</div>
          <div className="col col-4">Coupon</div>
          <div className="col col-5">Final Price</div>
        </li>
        {prop.histories.map((i, index) =>
        (
          <li className="table-row" key={index}>
            <div className="col col-6">
              {new Date(i.date).toLocaleDateString()}
            </div>
            <div className="col col-3">
              ${i.price.toFixed(2)}
            </div>
            <div className="col col-4">
              ${i.coupon.toFixed(2)}
            </div>
            <div className="col col-5">
              ${(i.price - i.coupon).toFixed(2)}
            </div>
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default ItemHistory;