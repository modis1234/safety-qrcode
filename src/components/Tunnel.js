import React from 'react';

const Tunnel = ({ tunnel }) => {
    const { tunnel_nm, developer_nm, tunnel_index} = tunnel;
    return (
        <div>
            <h1>{developer_nm}</h1>
            <p>{tunnel_nm} ({tunnel_index})</p>
        </div>
    );
};

export default Tunnel;