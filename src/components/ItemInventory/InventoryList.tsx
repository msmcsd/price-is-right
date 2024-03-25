import { Dispatch, SetStateAction } from "react";
import { InventoryItem } from "../../types/types";
import InventoryItemCard from "./InventoryItemCard";

type InventoryListProps = {
  items: InventoryItem[] | [],
  deleteItem(id: string| undefined): void
}


const InventoryList = ({items, deleteItem} : InventoryListProps) => {
  return (
    <>
      {items.map(i => <InventoryItemCard key={i._id} item={i} deleteItem={deleteItem} />)}
    </>
  )
}

export default InventoryList;