import React from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import ContactData from './containers/Checkout/ContactData/ContactData';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path = "/checkout/contact-data" exact component = {ContactData} />
          <Route path = "/checkout" exact component = {Checkout} />
          <Route path = "/" exact component = {BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
