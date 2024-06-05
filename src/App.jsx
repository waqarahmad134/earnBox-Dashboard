import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import ProductCategories from './pages/ProductCategories';
import Products from './pages/Products';
import Users from './pages/Users';
import Shops from './pages/Shops';
import Tailors from './pages/Tailors';
import Orders from './pages/Orders';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import ShopCategories from './pages/ShopCategories';
import TailorCategories from './pages/TailorCategories';


function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
    <ToastContainer/>
     <ChakraProvider>
      <Routes>
        <Route
          index
          path="/"
          element={
            <>
              <PageTitle title="Home | Admin Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="All Products | Admin Dashboard" />
              <Products />
            </>
          }
        />
        <Route
          path="/product-categories"
          element={
            <>
              <PageTitle title="Products Categories | Admin Dashboard" />
              <ProductCategories />
            </>
          }
        />
        <Route
          path="/shop-categories"
          element={
            <>
              <PageTitle title="Shop Categories | Admin Dashboard" />
              <ShopCategories />
            </>
          }
        />
        <Route
          path="/tailor-categories"
          element={
            <>
              <PageTitle title="tailor Categories | Admin Dashboard" />
              <TailorCategories />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="All Users | Admin Dashboard" />
              <Users />
            </>
          }
        />
        <Route
          path="/shops"
          element={
            <>
              <PageTitle title="All Shops | Admin Dashboard" />
              <Shops />
            </>
          }
        />
        <Route
          path="/tailors"
          element={
            <>
              <PageTitle title="All Tailors | Admin Dashboard" />
              <Tailors />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <PageTitle title="All Orders | Admin Dashboard" />
              <Orders />
            </>
          }
        />

        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Admin Dashboard" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Admin Dashboard" />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
