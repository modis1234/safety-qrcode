import React from "react";
import { Link } from 'react-router-dom';

const BridgeList = ({ bridges }) => {
  return (
    <ul>
      {bridges.map((bridge) => (
        <li key={bridge.id}>
           <Link to={`/bridge/${bridge.id}`}>{bridge.bridge_nm} ({bridge.bridge_index})</Link>
        </li>
      ))}
    </ul>
  );
};

export default BridgeList;
