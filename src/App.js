import React from "react";
import Bridges from "./component/Bridges"
import { BridgesProvider } from "./context/BridgesContext";

function App() {
  return (
    <BridgesProvider>
      <Bridges />
    </BridgesProvider>
  );
}

export default App;
