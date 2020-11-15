import React, { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

import Layout from '../../components/layout';
import CandlestickGraph from '../../components/candlestick-graph';

import { parseApiData, parseStreamData } from '../../services/data';

export default function Home() {
  const [graphData, setGraphData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const res = await fetch('/api');
        const json = await res.json();
        const apiData = parseApiData(json);

        setGraphData(apiData);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function updateGraphData(evt) {
      const json = JSON.parse(evt.data);
      const streamData = parseStreamData(json);

      setGraphData((current) => [
        ...current.slice(1, current.length),
        streamData,
      ]);
    }

    const handleStreamMsg = throttle(updateGraphData, 5000);

    const socket = new WebSocket('ws://localhost:8080/stream');
    socket.onmessage = handleStreamMsg;
  }, []);

  return (
    <Layout>
      {isLoading && <div>LOADING...</div>}
      {!isLoading && (
        <CandlestickGraph
          data={graphData}
        />
      )}
    </Layout>
  );
}
