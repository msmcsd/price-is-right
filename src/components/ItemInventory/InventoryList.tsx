import { InventoryItem } from "../../types/types";
import InventoryItemCard from "./InventoryItemCard";

type InventoryListProps = {
  items: InventoryItem[] | []
}


const InventoryList = ({items} : InventoryListProps) => {
  return (
    <>
      {items.map(i => <InventoryItemCard key={i._id} item={i} />)}
    </>
  )
}

export default InventoryList;