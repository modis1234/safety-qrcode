import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BridgeList from '../components/BridgeList';
import { getBridges } from '../modules/bridges';

const BridgeListContainer = () => {
    const { data, loading, error } = useSelector(state => state.bridges.bridges);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getBridges());
    },[dispatch]);

    if(loading && !data) return <div>로딩중...</div>
    if(error) return <div>에러발생!!!</div>
    if(!data) return null

    return <BridgeList bridges={data}/>;
};

export default BridgeListContainer;