import React from 'react';
import TunnelContainer from '../containers/TunnelContainer';

const TunnelPage = ({ match }) => {
    const { id } = match.params;
    const tunnelId = parseInt(id, 10); // 주의!! url 파라미터는 문자열이다. -> 타입이 다를 경우 파싱 필요
    return <TunnelContainer tunnelId={tunnelId} />
};

export default TunnelPage;  