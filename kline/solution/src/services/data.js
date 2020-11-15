export function mapRange(value, inRange, outRange) {
  const [inStart, inEnd] = inRange;
  const [outStart, outEnd] = outRange;

  return outStart + ((outEnd - outStart) / (inEnd - inStart)) * (value - inStart);
}

export function getRange(data = []) {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  data.forEach((item) => {
    const {
      open, high, low, close,
    } = item;

    const values = [
      open,
      high,
      low,
      close,
    ];

    values.forEach((value) => {
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
    });
  });

  return [min, max];
}

export function parseApiData(data = []) {
  return data
    .slice(data.length - 100, data.length)
    .map((item) => ({
      timestamp: item[0],
      open: Number(item[1]),
      high: Number(item[2]),
      low: Number(item[3]),
      close: Number(item[4]),
    }));
}

export function parseStreamData(data) {
  const {
    t, o, h, l, c,
  } = data.data.k;

  return {
    timestamp: t,
    open: Number(o),
    high: Number(h),
    low: Number(l),
    close: Number(c),
  };
}
