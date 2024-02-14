import { GroceryItem } from "../types/types";
import "../css/ItemInfoCard.css";

/*
  Used to display on the All Items page
*/

type ItemInfoProps = {
  item: GroceryItem;
  onClick: React.MouseEventHandler<HTMLElement>;
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
          <div className="item-price">${item?.price}</div>
          <div className="item-date">{new Date(item?.date).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default ItemInfoCard;