/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { getCssPropertyValue } from '../../services/dom';
import { getRange, mapRange } from '../../services/data';

import './candlestick-graph.css';

export default function CandlestickGraph({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const bulishColor = getCssPropertyValue('--bulish-color');
    const bearishColor = getCssPropertyValue('--bearish-color');
    const foregroundColor = getCssPropertyValue('--foreground-color');

    const canvas = canvasRef.current;

    const barWidth = 10;
    const lineWidth = 1.4;
    const padding = 20;
    const legendWidth = 150;

    const dataRange = getRange(data);
    const graphRange = [padding, canvas.height - padding];

    const stride = (canvas.width - legendWidth - barWidth) / data.length;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.forEach((item, index) => {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = item.open > item.close ? bearishColor : bulishColor;

      ctx.beginPath();
      ctx.moveTo(barWidth + index * stride, canvas.height - mapRange(item.low, dataRange, graphRange));
      ctx.lineTo(barWidth + index * stride, canvas.height - mapRange(item.high, dataRange, graphRange));
      ctx.stroke();

      ctx.lineWidth = barWidth;
      ctx.beginPath();
      ctx.moveTo(barWidth + index * stride, canvas.height - mapRange(item.close, dataRange, graphRange));
      ctx.lineTo(barWidth + index * stride, canvas.height - mapRange(item.open, dataRange, graphRange));
      ctx.stroke();
    });

    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(canvas.width - legendWidth + 10, canvas.height - padding);
    ctx.lineTo(canvas.width - legendWidth + 10, padding);
    ctx.strokeStyle = foregroundColor;
    ctx.stroke();

    ctx.fillStyle = foregroundColor;
    ctx.font = 'normal 20px Arial';

    for (let i = 0; i < 8; i += 1) {
      const h = 2 * padding + i * canvas.height / 8;
      ctx.beginPath();
      ctx.moveTo(canvas.width - legendWidth + 10, h);
      ctx.lineTo(canvas.width - legendWidth + 10 + 10, h);
      ctx.stroke();

      const label = mapRange(canvas.height - h, graphRange, dataRange);
      ctx.fillText(Number(label).toFixed(2), canvas.width - 125, h + 8);
    }
  });

  return (
    <div className="candlestick-graph">
      <canvas
        ref={canvasRef}
        width={1500}
        height={800}
      />
    </div>
  );
}

CandlestickGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.number,
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number,
  })).isRequired,
};
