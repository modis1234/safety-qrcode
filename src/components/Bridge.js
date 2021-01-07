import React from 'react';

const Bridge = ({ bridge }) => {
    console.log(bridge)
    const { bridge_nm, developer_nm, bridge_index} = bridge;
    return (
        <div>
            <h1>{developer_nm}</h1>
            <p>{bridge_nm} ({bridge_index})</p>
        </div>
    );
};

export default Bridge;