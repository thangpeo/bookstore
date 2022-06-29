import { Route, Routes } from "react-router-dom"
import ChangePassword from "../components/ChangePassword"
import Profile from "../components/Profile"
import Account from "../pages/Account"
import AddShippingAddress from "../pages/AddShippingAddress"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import EditShippingAddress from "../pages/EditShippingAddress"
import Home from "../pages/Home"
import Login from "../pages/Login"
import NotFound from "../pages/NotFound"
import Order from "../pages/Order"
import OrderDetail from "../pages/OrderDetail"
import ProductDetail from "../pages/ProductDetail"
import Products from "../pages/Products"
import ShippingAddress from "../pages/ShippingAddress"

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />}>
                <Route path=":category" element={<Products />}>
                    <Route path=":type" element={<Products />}>

                    </Route>
                </Route>
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />}>
                <Route index element={<Profile />} />
                <Route path="changepassword" element={<ChangePassword />} />
                <Route path="shippingaddress">
                    <Route index element={<ShippingAddress />} />
                    <Route path="add" element={<AddShippingAddress />} />
                    <Route path="edit/:id" element={<EditShippingAddress />} />
                </Route>
                <Route path="order">
                    <Route index element={<Order />} />
                    <Route path=":id" element={<OrderDetail />} />
                </Route>
            </Route>
            <Route path="/ProductDetail/:ProductId" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
export default Routers