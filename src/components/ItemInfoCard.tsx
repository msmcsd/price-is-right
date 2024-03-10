import { GroceryItem, ManageItemMode, ManageItemProps } from "../types/types";
import "../css/ItemInfoCard.css";
import editIcon from "../images/edit.png";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants/URL";
/*
  Used to display on the All Items page
*/

type ItemInfoProps = {
  item: GroceryItem;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const ItemInfoCard = ({ item, onClick }: ItemInfoProps) => {
  const navigate = useNavigate();

  // console.log("ItemInfoCard", item)

  const showPrice = (price: number, coupon: number) => {
    let finalPrice = price;
    let hasCoupon = false;

    if (coupon && coupon > 0) {
      finalPrice = price - coupon;
      hasCoupon = true;
      return <>${finalPrice.toFixed(2)}<span className="item-with-coupon">w/ coupon</span>${coupon.toFixed(2)}</>;
    }

    return "$" + finalPrice.toFixed(2);
  }

  const onEditClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    const payload: ManageItemProps = {
      item: item,
      mode: ManageItemMode.Edit
    }
    
    navigate(URL.EditItemBase + item.barcode, {state: payload});
  }

  return (
    <div className="item-info-card" onClick={onClick}>
      <div className="image-container">
        <img src={item.image_url} />
      </div>
      <div className="item-info-container">
        <div className="item-name-container">
          <div className="item-name">{item?.name}</div>
          <img className="item-edit" src={editIcon} onClick={onEditClick}/>
        </div>
        <div className="item-barcode">{item?.size}</div>
        <div className="item-price-date-container">
          <div className="item-price">{showPrice(item?.price, item?.coupon)}</div>
          <div className="item-date">{new Date(item?.date).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}

export default ItemInfoCard;