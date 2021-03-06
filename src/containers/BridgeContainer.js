import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bridge from "../components/Bridge";
import { reducerUtils } from "../lib/asyncUtils";
import { getBridge } from "../modules/bridges";

const BridgeContainer = ({ bridgeId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.bridges.bridge[bridgeId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getBridge(bridgeId));
    // eslint-disable-next-line
  }, [bridgeId, dispatch]);

  console.log(data);
  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Bridge bridge={data} />;
};

export default BridgeContainer;
