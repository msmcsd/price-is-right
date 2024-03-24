import { InventoryItem } from "../../types/types"
import ProductPhoto from "../ProductPhoto"
import InventoryItemInfo from "./InventoryItemInfo"
import "../../css/ItemInventory/InventoryItemCard.css"
import deleteIcon from '../../images/delete.png'

type InventoryItemCardProps = {
  item: InventoryItem
}

const InventoryItemCard = ({item} : InventoryItemCardProps) => {
  return (
    <div className="inv-item-card-container">
      <div className="inv-image-container">
        <ProductPhoto url={item?.image_url} description={item?.name} />
        <img className="delete-inv-image" src={deleteIcon} />
      </div>
      <InventoryItemInfo item={item}/>
    </div>
  )
}

export default InventoryItemCard;