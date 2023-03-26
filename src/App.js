import Header from "./components/Header";
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ItemInfo from "./pages/ItemInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <div>
            <Header/>
            <div className={styles.content}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/item/:id' element={<ItemInfo/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
