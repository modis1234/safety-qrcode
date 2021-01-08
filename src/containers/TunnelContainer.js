import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tunnel from "../components/Tunnel";
import { reducerUtils } from "../lib/asyncUtils";
import { getTunnel } from "../modules/tunnels";

const TunnelContainer = ({ tunnelId }) => {
  const { data, loading, error } = useSelector(
    (state) => state.tunnels.tunnel[tunnelId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getTunnel(tunnelId));

    // eslint-disable-next-line
  }, [tunnelId, dispatch]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <Tunnel tunnel={data} />;
};

export default TunnelContainer;
