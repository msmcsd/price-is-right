import './App.css';
import "./css/ItemLookup.css"
import NavMenu from './components/NavMenu';
import { Routes , Route} from 'react-router-dom';
import ItemLookup from './components/ItemLookup';
import MostRecentPrices from './components/MostRecentPrices';
import AddItem from './components/AddItem';
import ItemDetail from './components/ItemDetail';
import { URL } from './constants/URL';

const App = () => {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path={URL.Home} element={<ItemLookup />}/>
        <Route path={URL.AllItems} element={<MostRecentPrices />}/>
        <Route path={URL.AddItem} element={<AddItem />}/>
        <Route path={URL.LoadItem} element={<ItemDetail />}/>
      </Routes>
    </>

  );
}

export default App;
