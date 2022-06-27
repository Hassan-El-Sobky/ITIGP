
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import HomeScreens from "./screens/HomeScreens";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from "./screens/OrderScreen";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main  >
          <Container className="my-4">
            <Routes>
              <Route path="/" element={<HomeScreens />} />
              <Route path='/order/:id' element={<OrderScreen/>}></Route>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/"  >
                <Route index element={<CartScreen />} />
                <Route path=":id" element={<CartScreen />} />
              </Route>
              <Route path="/Login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>,

    </>
  );
}

export default App;
