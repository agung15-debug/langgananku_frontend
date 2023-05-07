import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderMyListScreen from './screens/OrderMyListScreen'
import SupplierListScreen from './screens/SupplierListScreen'
import SupplierEditScreen from './screens/SupplierEditScreen'
import ExpenseListScreen from './screens/ExpenseListScreen'
import ExpenseEditScreen from './screens/ExpenseEditScreen'
import AnnounceListScreen from './screens/AnnounceListScreen'
import AnnounceEditScreen from './screens/AnnounceEditScreen'
import TextAnnounceScreen from './screens/TextAnnounceScreen'
import PayScreen from './screens/PayScreen'
import SaleScreen from './screens/SaleScreen'
import BankAccountListScreen from './screens/BankAccountListScreen'
import BankAccountEditScreen from './screens/BankAccountEditScreen'
import BankAccountQrisEditScreen from './screens/BankAccountQrisEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/payorder/:id' component={PayScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/ordermylist' component={OrderMyListScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/salelist'
            component={SaleScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route
            path='/admin/supplierlist'
            component={SupplierListScreen}
            exact
          />
          <Route
            path='/admin/supplierlist/:pageNumber'
            component={SupplierListScreen}
            exact
          />
          <Route path='/admin/supplier/:id/edit' component={SupplierEditScreen} />
          <Route
            path='/admin/expenses'
            component={ExpenseListScreen}
            exact
          />
          <Route
            path='/admin/expenses/:pageNumber'
            component={ExpenseListScreen}
            exact
          />
          <Route path='/admin/expense/:id/edit' component={ExpenseEditScreen} />
          <Route
            path='/admin/bankAccounts'
            component={BankAccountListScreen}
            exact
          />
          <Route path='/admin/bankAccount/:id/edit' component={BankAccountEditScreen} />
          <Route path='/admin/bankAccount/:id/editQris' component={BankAccountQrisEditScreen} />
          <Route
            path='/admin/announce'
            component={AnnounceListScreen}
            exact
          />
          <Route
            path='/admin/announce/:pageNumber'
            component={AnnounceListScreen}
            exact
          />
          <Route path='/admin/announce/:id/edit' component={AnnounceEditScreen} />
          <Route path='/admin/createtextannounce' component={TextAnnounceScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
