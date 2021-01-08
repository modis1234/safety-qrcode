import React from "react";
import { Link } from 'react-router-dom';

const TunnelList = ({ tunnels }) => {
  return (
    <ul>
      {tunnels.map((tunnel) => (
        <li key={tunnel.id}>
          <div>{tunnel.id} {tunnel.tunnel_nm}</div>
           <Link to={`/tunnel/${tunnel.id}`}>{tunnel.tunnel_nm} ({tunnel.tunnel_index})</Link>
        </li>
      ))}
    </ul>
  );
};

export default TunnelList;
