import React, { useEffect, useState } from 'react';
import './App.css';
import { GroceryItem } from './types/types';
import { loadItems } from './database';

function App() {
  const [items, setItems] = useState<GroceryItem[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const populateItems = () => {
    return (
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Barcode</div>
          <div className="col col-2">Item Name</div>
          <div className="col col-3">List Price</div>
          <div className="col col-4">Coupon</div>
          <div className="col col-5">Final Price</div>
          <div className="col col-6">Date</div>
        </li>
        {items.map(i =>
        (
          <li className="table-row" key={i.barcode}>
            <div className="col col-1">
              {i.barcode}
            </div>
            <div className="col col-2">
              {i.name}
            </div>
            <div className="col col-3">
              ${i.price.toFixed(2)}
            </div>
            <div className="col col-4">
              ${i.coupon.toFixed(2)}
            </div>
            <div className="col col-5">
              ${(i.price - i.coupon).toFixed(2)}
            </div>
            <div className="col col-6">
              {new Date(i.date).toLocaleDateString()}
            </div>
          </li>
        ))
        }
      </ul>      
    );
  }

  return (
    <div className="container">
      {isLoading ? <h1>Spinning server up. Will continue in about 30 seconds...</h1> : populateItems()}
    </div>
  );
}

export default App;
