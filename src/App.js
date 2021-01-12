import React from 'react';
import { Route } from 'react-router-dom';
import BridgeListPage from './pages/BridgeListPage';
import BridgePage from './pages/BridgePage';
import LoginPage from './pages/LoginPage';
import TunnelListPage from './pages/TunnelListPage';
import TunnelPage from './pages/TunnelPage';

function App() {
  return (
    <>
      <Route path="/" component={LoginPage} exact />
      <Route path="/bridge" component={BridgeListPage} exact={true} />
      <Route path="/bridge/:id" component={BridgePage} />
      <Route path="/tunnel" component={TunnelListPage} exact={true} />
      <Route path="/tunnel/:id" component={TunnelPage} />
    </>
  );
}

export default App;