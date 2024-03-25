import { InventoryItem } from "../../types/types"
import ProductPhoto from "../ProductPhoto"
import InventoryItemInfo from "./InventoryItemInfo"
import "../../css/ItemInventory/InventoryItemCard.css"
import deleteIcon from '../../images/delete.png'
import { deleteInventoryItem } from "../../services/inventory"

type InventoryItemCardProps = {
  item: InventoryItem,
  deleteItem(id: string | undefined): void
}

const InventoryItemCard = ({item, deleteItem} : InventoryItemCardProps) => {
  return (
    <div className="inv-item-card-container">
      <div className="inv-image-container">
        <ProductPhoto url={item?.image_url} description={item?.name} />
        <img className="delete-inv-image" src={deleteIcon} onClick={() => deleteItem(item?._id)}/>
      </div>
      <InventoryItemInfo item={item}/>
    </div>
  )
}

export default InventoryItemCard;