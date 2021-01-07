import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bridge from "../components/Bridge";
import { getBridge } from "../modules/bridges";

const BridgeContainer = ({ bridgeId }) => {
  const { data, loading, error } = useSelector((state) => state.bridges.bridge);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBridge(bridgeId));
  }, [bridgeId, dispatch]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Bridge bridge={data}/>;
};

export default BridgeContainer;
