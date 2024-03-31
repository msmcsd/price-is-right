import { InventoryItem } from "../../types/types";
import PlusIcon from "../../images/plus.png";
import MinusIcon from "../../images/minus.png";
import "../../css/ItemInventory/InventoryItemCard.css";
import { useState } from "react";
import { updateInventoryItem } from "../../services/inventory";


type InventoryItemInfoProps = {
  item: InventoryItem
}

const InventoryItemInfo = ({item}: InventoryItemInfoProps) => {
  const [count, setCount] = useState(item?.count)

  const decreaseCount = async () => {
    const new_count = count - 1;
    // console.log("decrease", count)
    if (new_count < 0) return;

    const result = await updateInventoryItem({...item, count: new_count});
    if (result.modifiedCount >= 1)
    {
      setCount(new_count);
    }
  }

  const increaseCount = async () => {
    const new_count = count + 1;
    const result = await updateInventoryItem({...item, count: new_count});
    if (result.modifiedCount >= 1) {
      setCount(new_count);
    }
  }

  // const isExpired = () => {
  //   return new Date() > item?.expiration_date;
  // }

  return (
    <div className="inv-item-info-container">
      <div className="title">
        <h1 className="">{item?.name}</h1>
        <label className="">{item?.barcode}</label>
      </div>
      {/* {isExpired() ? <div className="inv-item-exp-date-expired blink-date">EXPIRED: {new Date(item?.expiration_date).toLocaleDateString()}</div> :
                     <div className="inv-item-exp-date">Expiration Date: {new Date(item?.expiration_date).toLocaleDateString()}</div>} */}
      <div>
        <div className="inv-item-exp-date">Expiration: {new Date(item?.expiration_date).toLocaleDateString()}</div>
          <div className="inv-adjust-container">
            <img className="up-down-button" src={PlusIcon} onClick={increaseCount}/>
            <label className="inv-count">{count}</label>
            <img className="up-down-button" src={MinusIcon} onClick={decreaseCount}/>
          </div>
        </div>
    </div>
  )
}

export default InventoryItemInfo;