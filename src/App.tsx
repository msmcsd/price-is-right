import React, { useEffect, useState } from 'react';
import './App.css';

type GroceryItem = {
  barcode: string,
  name: string,
  price: number,
  date: Date
}

function App() {
  const [items, setItems] = useState<GroceryItem[] | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadItems = async () => {
    const list = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/list", {
      mode: "cors",
      method: "GET"
    });

    const json = await list.json();
    setItems(json);
  }

  useEffect(() => {
    loadItems();
    setIsLoading(false);
  }, [])

  const populateItems = () => {
    return (
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Barcode</div>
          <div className="col col-2">Item Name</div>
          <div className="col col-3">List Price</div>
          <div className="col col-4">Date</div>
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
              ${i.price}
            </div>
            <div className="col col-4">
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
