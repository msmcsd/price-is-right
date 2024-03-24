import { InventoryItem } from "../../types/types"
import ProductPhoto from "../ProductPhoto"
import InventoryItemInfo from "./InventoryItemInfo"
import "../../css/ItemInventory/InventoryItemCard.css"

type InventoryItemCardProps = {
  item: InventoryItem
}

const InventoryItemCard = ({item} : InventoryItemCardProps) => {
  return (
    <div className="inv-item-card-container">
      <div style={{width: "250px"}}>
        <ProductPhoto url={item?.imageUrl} description={item?.name} />
      </div>
      <InventoryItemInfo item={item}/>
    </div>
  )
}

export default InventoryItemCard;