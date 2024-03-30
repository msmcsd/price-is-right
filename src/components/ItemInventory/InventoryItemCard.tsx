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
  
  const getClasNameByExpirationDate = () => {
    let className = "inv-item-card-container";
    const today = new Date();
    const dayDiff: number = (new Date(item.expiration_date).getTime() - new Date().getTime())/(1000 * 60 * 60 * 24);
    
    if (dayDiff <= 0)
      return className + " inv-item-card-container-expired"
    else if (dayDiff <= 7)
      return className + " inv-item-card-container-expiring"
    else
      return className;
  }
  
  return (
    <div className={getClasNameByExpirationDate()}>
      <div className="inv-image-container">
        <ProductPhoto url={item?.image_url} description={item?.name} />
        <img className="delete-inv-image" src={deleteIcon} onClick={() => deleteItem(item?._id)}/>
      </div>
      <InventoryItemInfo item={item}/>
    </div>
  )
}

export default InventoryItemCard;