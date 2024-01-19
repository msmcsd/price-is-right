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
  }, [])

  return (
    <div className="container">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Barcode</div>
          <div className="col col-2">Grocery Item Name</div>
          <div className="col col-3">Last Price</div>
          <div className="col col-4">Date of Last Price </div>
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
                {i.price}
              </div>     
              <div className="col col-4">
                {i.date.toString()}
              </div>     
            </li>       
          ))
          }
      </ul>
    </div>
  );
}

export default App;
