import React, { useEffect } from "react";
import { getBridge, useBridgesState, useBridgesDispatch } from "../context/BridgesContext";

const Bridge = ({ id }) => {
  const state = useBridgesState();
  const dispatch = useBridgesDispatch();

  const { lodaing, data: bridge, error } = state.bridge;
  useEffect(()=> {
    getBridge(dispatch, id);
  },[dispatch, id]);

  if (lodaing) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!bridge) return null;

  return (
    <div>
      <h2>{bridge[0].bridge_index}</h2>
      <p>
        <b>교량명:</b> {bridge[0].bridge_nm}
      </p>
    </div>
  );
};

export default Bridge;
