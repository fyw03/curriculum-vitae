// 计算两点之间的距离
export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const rad = (d) => d * Math.PI / 180.0;
  const R = 6371; // 地球半径，单位为公里
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 解压缩路线坐标
export const decompressRoute = (polyline) => {
  if (!polyline || !Array.isArray(polyline)) {
    return null;
  }

  const points = [];
  const coors = [...polyline];

  for (let i = 2; i < coors.length; i++) {
    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / 1000000;
  }

  for (let i = 0; i < coors.length; i += 2) {
    points.push({
      latitude: coors[i],
      longitude: coors[i + 1]
    });
  }

  return points;
}; 