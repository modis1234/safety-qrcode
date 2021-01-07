import React from 'react';
import BridgeContainer from '../containers/BridgeContainer';

const BridgePage = ({ match }) => {
    const { id } = match.params;
    const bridgeId = parseInt(id, 10); // 주의!! url 파라미터는 문자열이다. -> 타입이 다를 경우 파싱 필요
 
    return <BridgeContainer bridgeId={bridgeId} />
};

export default BridgePage;