import React from 'react';

const Logout = ({ login, onLogout }) => {
    return (
        <div>
            <div>{login.name}</div>
           <button onClick={onLogout}>로그아웃</button> 
        </div>
    );
};

export default Logout;