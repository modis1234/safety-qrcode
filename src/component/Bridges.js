import React, { useState } from 'react';
import Bridge from './Bridge';
import { useBridgesState, useBridgesDispatch, getBridges, postBridge } from '../context/BridgesContext';

function Bridges() {
  const [bridgeId, setBridgeId] = useState(null);
  const state = useBridgesState();
  const dispatch = useBridgesDispatch();

  const { data: bridges, loading, error } = state.bridges;
  const fetchData = () => {
    getBridges(dispatch);
  };

  const postData = () =>{
    postBridge(dispatch);
  }

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!bridges) return <button onClick={fetchData}>불러오기</button>;


  return (
    <>
      <ul>
        {bridges.map(bridge => (
          <li
            key={bridge.id}
            onClick={() => setBridgeId(bridge.id)}
            style={{ cursor: 'pointer' }}
          >
            {bridge.bridge_nm} ({bridge.bridge_index})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      <button onClick={postData}>입력</button>
      
      {bridgeId && <Bridge id={bridgeId} /> }
    </>
  );
}

export default Bridges;
