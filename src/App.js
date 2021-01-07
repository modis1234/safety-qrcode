import React from 'react';
import { Route } from 'react-router-dom';
import BridgeListPage from './pages/BridgeListPage';
import BridgePage from './pages/BridgePage';

function App() {
  return (
    <>
      <Route path="/" component={BridgeListPage} exact={true} />
      <Route path="/:id" component={BridgePage} />
    </>
  );
}

export default App;