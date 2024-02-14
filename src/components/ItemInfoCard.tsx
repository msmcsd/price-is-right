import { GroceryItem } from "../types/types";
import "../css/ItemInfoCard.css";
import { flattenDiagnosticMessageText } from "typescript";

/*
  Used to display on the All Items page
*/

type ItemInfoProps = {
  item: GroceryItem;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const showPrice = (price : number, coupon: number) => {
  let finalPrice = price;
  let hasCoupon = false;

  if (coupon && coupon > 0) {
    finalPrice = price - coupon;
    hasCoupon = true;
    return <>${finalPrice.toFixed(2)}<span className="item-with-coupon">w/ coupon</span>${coupon.toFixed(2)}</>;
  }

  return "$" + finalPrice.toFixed(2);
}

const ItemInfoCard = ({ item, onClick }: ItemInfoProps) => {
  return (
    <div className="item-info-card" onClick={onClick}>
      <div className="image-container">
        <img src={item.image_url} />
      </div>
      <div className="item-info-container">
          <div className="item-name">{item?.name}</div>
          <div className="item-barcode">{item?.barcode}</div>
          <div className="item-price">{showPrice(item?.price, item?.coupon)}</div>
          <div className="item-date">{new Date(item?.date).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default ItemInfoCard;