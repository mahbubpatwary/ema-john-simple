import './App.css';
import Header from './components/Header/Header'
import Shop from './components/Shop/Shop';
import Inventory from './components/Inventory/Inventory'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



export const userContext = createContext();



function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
       <p>email:{loggedInUser.email} </p> 

      <Router>
      <Header></Header>
        <Switch>
          <Route exact path='/'>
             <Shop></Shop>
          </Route>

          <Route path='/shop'>
            <Shop></Shop>
          </Route>

          <Route path='/review'>
            <Review></Review>
          </Route>

          <PrivateRoute path='/inventory'>
            <Inventory></Inventory>
          </PrivateRoute>

          <Route path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>

          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>

          <Route path='/login'>
            <Login></Login>
          </Route>

          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        
        </Switch>
      </Router>

     
     








    </userContext.Provider>
  );
}

export default App;
