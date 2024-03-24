import { useState } from "react";
import InventoryList from "./InventoryList";
import { InventoryItem } from "../../types/types";

const items: InventoryItem[] = [
  { name: "Aveeno Lotion", barcode: "381371151035", expiration: new Date('2024-05-25'), count: 10, imageUrl: "https://i5.walmartimages.com/seo/Aveeno-Active-Naturals-Daily-Moisturizing-Lotion-Twin-Pack-20-OZ_52018562-4ab6-40dd-9a37-96c766935680.7f924c174ca9d9fba42d0e4059ef363e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF" },
  { name: "Avocado Oil Class Mayonnaise ", barcode: "815074022809", expiration: new Date('2024-01-25'), count: 20, imageUrl: "https://m.media-amazon.com/images/I/71Mt9KBe-fL._SX679_.jpg" }
]

const InventoryPage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [expiredChecked, setExpiredChecked] = useState<boolean>(false);

  const handleClearSearch = () => {
    setSearchText("")
  }

  const handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleExpiredChecked = (e: React.FormEvent<HTMLInputElement>) => {
    setExpiredChecked(e.currentTarget.checked)
  }

  const getFilteredItem = () => {
    let itms = items.filter(i => i.name?.toLowerCase().includes(searchText?.toLowerCase()));
    console.log(expiredChecked)
    if (expiredChecked) {
      itms = itms.filter(i => new Date() > new Date(i?.expiration));
    }
    return itms;
  }

  return (
    <>
      <div className="flex-form">
        <input type="text"
          name="barcode"
          placeholder="Search by Name"
          onChange={handleSearchTextChange}
          value={searchText}
        />
        <input type="button" className="red-button" value="Clear" onClick={handleClearSearch} />
        <input type="checkbox" id="expired" name="expired" checked={expiredChecked} onChange={handleExpiredChecked} />
        <label htmlFor="expired">Expired</label>
      </div>
      <div className="inv-items-container" style={{ margin: "auto auto auto auto" }} >
        <InventoryList items={getFilteredItem()}/>
      </div>
    </>
  )
}

export default InventoryPage;