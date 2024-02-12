import './App.css';
import "./css/ItemLookup.css"
import NavMenu from './components/NavMenu';
import { Routes , Route} from 'react-router-dom';
import ItemLookup from './components/ItemLookup';
import MostRecentPrices from './components/MostRecentPrices';
import AddItem from './components/AddItem';
import ItemInfo from './components/ItemInfo';

const App = () => {
  return (
    <>
      <NavMenu />
      <Routes>
        <Route path="/" element={<ItemLookup />}/>
        <Route path="/items" element={<MostRecentPrices />}/>
        <Route path="/additem" element={<AddItem />}/>
        <Route path="/item/:id" element={<ItemInfo />}/>
      </Routes>
    </>

  );
}

export default App;
