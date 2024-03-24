import './App.css';
import "./css/ItemLookup.css"
import NavMenu from './components/NavMenu';
import { Routes , Route} from 'react-router-dom';
import ItemLookup from './components/ItemLookup';
import MostRecentPrices from './components/MostRecentPrices';
import ManageItem from './components/ManageItem';
import ItemDetail from './components/ItemDetail';
import { URL } from './constants/URL';
import InventoryPage from './components/ItemInventory/InventoryPage';

const App = () => {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path={URL.Home} element={<ItemLookup />}/>
        <Route path={URL.AllItems} element={<MostRecentPrices />}/>
        <Route path={URL.AddItem} element={<ManageItem />}/>
        <Route path={URL.LoadItem} element={<ItemDetail />}/>
        <Route path={URL.EditItem} element={<ManageItem />}/>
        <Route path={URL.Inventory} element={<InventoryPage />} />
      </Routes>
    </>

  );
}

export default App;
