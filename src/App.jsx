import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import Users from './pages/Users';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import Package from './pages/Packages/Package';
import AddPackage from './pages/Packages/AddPackage';
import EditPackage from './pages/Packages/EditPackage';
import UserDetails from './pages/UserDetails';
import PaymentMethod from './pages/PaymentMethod/PaymentMethod';
import EditPaymentMethod from './pages/PaymentMethod/EditPaymentMethod';
import AddPaymentMethod from './pages/PaymentMethod/AddPaymentMethod';
import WithdrawRequest from './pages/Withdraw/WithdrawRequest';
import Ad from './pages/Ads/Ad';
import AddAd from './pages/Ads/AddAd';
import EditAd from './pages/Ads/EditAd';


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
          path="/packages"
          element={
            <>
              <PageTitle title="All Packages | Admin Dashboard" />
              <Package />
            </>
          }
        />
        <Route
          path="/add-package"
          element={
            <>
              <PageTitle title="Add Package | Admin Dashboard" />
              <AddPackage />
            </>
          }
        />
        <Route
          path="/edit-package"
          element={
            <>
              <PageTitle title="Edit Package | Admin Dashboard" />
              <EditPackage />
            </>
          }
        />
        <Route
          path="/payment-method"
          element={
            <>
              <PageTitle title="Payment Methods | Admin Dashboard" />
              <PaymentMethod />
            </>
          }
        />
        <Route
          path="/add-payment-method"
          element={
            <>
              <PageTitle title="Add Payment Method | Admin Dashboard" />
              <AddPaymentMethod />
            </>
          }
        />
        <Route
          path="/edit-payment-method"
          element={
            <>
              <PageTitle title="Edit Payment Method | Admin Dashboard" />
              <EditPaymentMethod />
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
          path="/user-details"
          element={
            <>
              <PageTitle title="All Users | Admin Dashboard" />
              <UserDetails />
            </>
          }
        />     
        <Route
        path="/withdraw-request"
          element={
            <>
              <PageTitle title="Withdraw Request | Admin Dashboard" />
              <WithdrawRequest />
            </>
          }
        />     
        <Route
        path="/ad"
          element={
            <>
              <PageTitle title="Add | Admin Dashboard" />
              <Ad />
            </>
          }
        />     
        <Route
        path="/add-ad"
          element={
            <>
              <PageTitle title="Add Ads | Admin Dashboard" />
              <AddAd />
            </>
          }
        />     
        <Route
        path="/edit-ad"
          element={
            <>
              <PageTitle title="edit Ads | Admin Dashboard" />
              <EditAd />
            </>
          }
        />     
      </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
