import './App.css';
import React, { useState } from "react";
import { FoodApiResult, GroceryItem } from "./types/types";
import "./css/ItemLookup.css"
import ItemHistory from "./components/ItemHistory";
import { loadItemHistory, upsertItem } from "./database";
import ItemCard from "./components/ItemCard";
import ItemLookupForm from './components/ItemLookupForm';
import NavMenu from './components/NavMenu';
import { Routes , Route} from 'react-router-dom';
import ItemLookup from './components/ItemLookup';
import MostRecentPrices from './components/MostRecentPrices';
import AddItem from './components/AddItem';

const App = () => {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path="/" element={<ItemLookup />}/>
        <Route path="/allitems" element={<MostRecentPrices />}/>
        <Route path="/additem" element={<AddItem />}/>
        <Route path="/item/:id" element={<ItemLookup />}/>
      </Routes>
    </>

  );
}

export default App;
