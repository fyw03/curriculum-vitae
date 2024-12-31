import { calculateDistance, decompressRoute } from '../../utils/map';

//在这里添加你申请的腾讯地图api
const API_KEY = '';


Page({
  data: {
    longitude: 0,
    latitude: 0,
    searchQuery: '',
    markers: [],
    polyline: [],
    distance: null,
    loading: false,
    error: null,
    currentLocation: null
  },

  onLoad() {
    this.getLocation();
  },

  getLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const { longitude, latitude } = res;
        this.setData({
          longitude,
          latitude,
          currentLocation: { latitude, longitude },
          markers: [{
            id: 0,
            latitude,
            longitude,
            title: '当前位置',
            width: 50,
            height: 50
          }]
        });
      },
      fail: () => this.setData({ error: '获取位置失败' })
    });
  },

  onInput(e) {
    this.setData({ searchQuery: e.detail.value });
  },

  searchLocation() {
    const { searchQuery } = this.data;
    if (!searchQuery) {
      this.setData({ error: '请输入目的地' });
      return;
    }

    this.setData({ loading: true, error: null });
    this.searchPlace(searchQuery);
  },

  searchPlace(keyword) {
    wx.request({
      url: `https://apis.map.qq.com/ws/place/v1/search`,
      data: {
        keyword,
        boundary: 'nearby(28.681114,115.918377,1000,1)',
        key: API_KEY
      },
      success: (res) => this.handleSearchResult(res),
      fail: () => this.setData({ error: '搜索失败，请重试' }),
      complete: () => this.setData({ loading: false })
    });
  },

  handleSearchResult(res) {
    if (res.data.status === 0 && res.data.data.length > 0) {
      const location = res.data.data[0].location;
      this.updateMapLocation(location);
    } else {
      this.setData({ error: '未找到该地点' });
    }
  },

  updateMapLocation(location) {
    this.setData({
      longitude: location.lng,
      latitude: location.lat,
      markers: [
        ...this.data.markers,
        {
          id: 1,
          latitude: location.lat,
          longitude: location.lng,
          title: this.data.searchQuery,
          width: 50,
          height: 50
        }
      ]
    });
  },

  getRoute() {
    const { currentLocation, markers } = this.data;
    if (!currentLocation || markers.length < 2) {
      this.setData({ error: '请先搜索目的地' });
      return;
    }

    this.setData({ loading: true, error: null });

    // 构建起点和终点坐标
    const from = `${currentLocation.latitude},${currentLocation.longitude}`;
    const to = `${markers[1].latitude},${markers[1].longitude}`;

    wx.request({
      url: `https://apis.map.qq.com/ws/direction/v1/driving/`,
      data: {
        from: from,
        to: to,
        key: API_KEY
      },
      success: (res) => {
        if (res.data.status === 0) {
          const points = decompressRoute(res.data.result.routes[0].polyline);
          if (points) {
            this.setData({
              polyline: [{
                points: points,
                color: "#FF0000DD",
                width: 4
              }]
            });
            // 调整地图视野以包含路线
            wx.createMapContext('map').includePoints({
              points: points,
              padding: [80, 80, 80, 80]
            });
          }
        } else {
          this.setData({ error: '获取路线失败' });
        }
      },
      fail: () => {
        this.setData({ error: '请求失败，请重试' });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  calculateDistance() {
    const { currentLocation, markers } = this.data;
    if (!currentLocation || markers.length < 2) {
      this.setData({ error: '请先搜索目的地' });
      return;
    }

    const distance = this.getDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      markers[1].latitude,
      markers[1].longitude
    );

    this.setData({
      distance: {
        from: '当前位置',
        to: this.data.searchQuery,
        value: distance.toFixed(2)
      }
    });
  },

  // 计算两点之间的直线距离
  getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // 地球半径，单位km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  toRad(degree) {
    return degree * Math.PI / 180;
  }
});
