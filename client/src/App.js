import Header from "./components/Header";
import styles from './App.module.css';
import {Route, Routes} from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ItemInfo from "./pages/ItemInfo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, fetchAuthMe, selectIsAuth} from "./redux/slices/auth";
import React from "react";
import Admin from "./pages/Admin";
import MyOrders from "./pages/MyOrders";
import EditItem from "./pages/EditItem";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    React.useEffect(() => {
        dispatch(fetchAuthMe());
    }, [])

    return (
        <div>
            <Header/>
            <div className={styles.content}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/items/:id' element={<ItemInfo/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/admin' element={<Admin/>}/>
                    <Route path='/cart/myOrders' element={<MyOrders/>}/>
                    <Route path='/item/edit/:id' element={<EditItem/>}/>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
