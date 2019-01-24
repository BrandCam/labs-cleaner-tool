import React, { createContext, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import {
  LandingPage,
  Properties,
  Login,
  PostRegister,
  Settings,
  PropertyDetails,
  Guests,
  GuestDetail,
  Checkout,
  Assistants,
  InviteAst,
} from './pages/index';
import { Sidebar } from './components/index';
import './App.css';
import Billing from './pages/Billing/Billing';
interface UserData {
  id: number;
  loggedIn: boolean;
  role: string;
}

const App = (props: any) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role') || '';
  const id = Number(localStorage.getItem('id')) || -1;
  const defaultValue = {
    id,
    loggedIn: token ? true : false,
    role,
  };

  const UserContext = createContext<UserData>(defaultValue);

  console.log(UserContext);
  return (
    <div className='App'>
      <UserContext.Provider value={defaultValue}>
        <Sidebar />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/Login' render={() => <Login {...props} />} />
          <Route exact path='/checkout/:id' component={Checkout} />
          <Route exact path='/test' component={Billing} />
          <Route path='/billing' component={Billing} />
          <Route exact path='/postreg' component={PostRegister} />
          <Route exact path='/properties' component={Properties} />
          <Route exact path='/properties/:id' component={PropertyDetails} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/updateinfo' component={PostRegister} />
          <Route exact path='/assistants' component={Assistants} />
          <Route exact path='/guests' component={Guests} />
          <Route exact path='/guests/:id' component={GuestDetail} />
          <Route exact path='/invite' component={InviteAst} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
