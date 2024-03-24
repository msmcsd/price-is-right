import { InventoryItem } from "../../types/types";
import PlusIcon from "../../images/plus.png";
import MinusIcon from "../../images/minus.png";
import "../../css/ItemInventory/InventoryItemCard.css";
import { useState } from "react";


type InventoryItemInfoProps = {
  item: InventoryItem
}

const InventoryItemInfo = ({item}: InventoryItemInfoProps) => {
  const [count, setCount] = useState(item?.count)

  const decreaseCount = () => {
    setCount(prev => {
      if (prev - 1 < 0) return 0;
      return prev -1;
    })
  }

  const increaseCount = () => {
    setCount(prev => prev + 1);
  }

  const isExpired = () => {
    return new Date() > new Date(item?.expiration);
  }

  return (
    <div className="inv-item-info-container">
      <div className="title">
        <h1 className="">{item?.name}</h1>
        <label className="">{item?.barcode}</label>
      </div>
      {isExpired() ? <div className="inv-item-exp-date-expired blink-date">EXPIRED: {new Date(item?.expiration).toLocaleDateString()}</div> :
                     <div className="inv-item-exp-date">Expiration Date: {new Date(item?.expiration).toLocaleDateString()}</div>}
      <div className="inv-adjust-container">
        <img className="up-down-button" src={PlusIcon} onClick={increaseCount}/>
        <label className="inv-count">{count}</label>
        <img className="up-down-button" src={MinusIcon} onClick={decreaseCount}/>
      </div>
    </div>
  )
}

export default InventoryItemInfo;