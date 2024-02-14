import React, { useEffect, useState } from 'react';
import { GroceryItem } from '../types/types';
import { loadItems } from '../database';
import { useNavigate } from "react-router-dom";
import "../css/ItemHistory.css";
import ItemInfoCard from './ItemInfoCard';

const MostRecentPrices = () => {
  const [items, setItems] = useState<GroceryItem[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await loadItems();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, [])

  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  const populateItems = () => {
    return (
      <div className="item-info-card-container">
        {items.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase())).map(i => <ItemInfoCard onClick={() => handleClick("/item/" + i.barcode)} key={i.barcode} item={i}/> )}
      </div>
    );
    // return (
    //   <ul className="responsive-table">
    //     <li className="table-header">
    //       <div className="col col-1">Barcode</div>
    //       <div className="col col-2">Item Name</div>
    //       <div className="col col-3">List Price</div>
    //       <div className="col col-4">Coupon</div>
    //       <div className="col col-5">Final Price</div>
    //       <div className="col col-6">Date</div>
    //     </li>
    //     {items.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase())).map(i =>
    //     (
    //       <li className="table-row-main" key={i.barcode} onClick={() => handleClick("/item/" + i.barcode)}>
    //         <div className="col col-1">
    //           {i.barcode}
    //         </div>
    //         <div className="col col-2">
    //           {i.name}
    //         </div>
    //         <div className="col col-3">
    //           ${i.price.toFixed(2)}
    //         </div>
    //         <div className="col col-4">
    //           {i.coupon !== 0 ? "$" + i.coupon.toFixed(2) : ""}
    //         </div>
    //         <div className="col col-5">
    //           ${(i.price - i.coupon).toFixed(2)}
    //         </div>
    //         <div className="col col-6">
    //           {new Date(i.date).toLocaleDateString()}
    //         </div>
    //       </li>
    //     ))
    //     }
    //   </ul>
    // );
  }

  const handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value)
  }

  const handleClearSearch = (e : React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText("");
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
      </div>
      <div className="container" style={{ margin: "auto auto auto auto" }} >
        {isLoading ? <h1>Spinning server up. Will continue in about 30 seconds...</h1> : populateItems()}
      </div>
    </>
  );
}

export default MostRecentPrices;