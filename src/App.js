import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders"  component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            {/* Exact is used to match the route exactly. There is no 
            need to use switch and exact both at the same time
            Switch will render the first matching route. */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
