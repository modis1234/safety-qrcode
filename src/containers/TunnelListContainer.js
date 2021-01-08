import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTunnels } from '../modules/tunnels';
import TunnelList from '../components/TunnelList';


const TunnelListContainer = () => {
    const { data, loading, error } = useSelector(state => state.tunnels.tunnels);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTunnels());
    },[dispatch]);

    if(loading && !data) return <div>로딩중...</div>
    if(error) return <div>에러발생!!!</div>
    if(!data) return null
    return <TunnelList tunnels={data}/>;
    // return <BridgeList bridges={data}/>;
};

export default TunnelListContainer;