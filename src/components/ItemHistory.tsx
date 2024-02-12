import "../css/ItemLookup.css";
import "../css/ItemHistory.css";
import { GroceryItem, DeleteItemResult } from "../types/types";
import deleteIcon from "../images/delete.png";
import { deleteHistory } from "../database";
import { Dispatch, SetStateAction } from "react";

type ItemHistoryProps = {
  histories: GroceryItem[],
  setHistories: Dispatch<SetStateAction<GroceryItem[] | []>>;
}

const ItemHistory = ({ histories, setHistories }: ItemHistoryProps) => {
  const item: GroceryItem = histories[0];
  // console.log(item)

  const deleteItemHistory = async (id: string) => {
    const result: DeleteItemResult = await deleteHistory(id)
    // console.log("Delete item history result", result)
    // console.log("result.deleteCount", result.deletedCount)

    if (result.deletedCount > 0) {
      // console.log("Delete local item history")
      setHistories(histories.filter(item => item._id !== id))
    }
  }

  return (
    <div>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-6">Date</div>
          <div className="col col-3">List Price</div>
          <div className="col col-4">Coupon</div>
          <div className="col col-5">Final Price</div>
          <div></div>
        </li>
        {histories.map((i, index) =>
        (
          <li className="table-row" key={index}>
            <div className="col col-6">
              {new Date(i.date).toLocaleDateString()}
            </div>
            <div className="col col-3">
              ${i.price.toFixed(2)}
            </div>
            <div className="col col-4">
              {i.coupon !== 0 ? "$" + i.coupon.toFixed(2) : ""}
            </div>
            <div className="col col-5">
              ${i.price - i.coupon >= 0 ? (i.price - i.coupon).toFixed(2) : "0"}
            </div>
            <div className="col col-delete">
              <img className="image-delete" src={deleteIcon} onClick={e => deleteItemHistory(i._id as string)} />
            </div>
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default ItemHistory;