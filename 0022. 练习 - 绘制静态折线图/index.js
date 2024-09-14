drawLineChart({
  title: 'svg 视频周播放量（天）',
  id: '#svg1',
  yAxis: false,
  color: '#abf',
  data: [
    { xLabel: '周一', value: 200 },
    { xLabel: '周二', value: 550 },
    { xLabel: '周三', value: 60 },
    { xLabel: '周四', value: 300 },
    { xLabel: '周五', value: 240 },
    { xLabel: '周六', value: 180 },
    { xLabel: '周日', value: 360 },
  ],
})

drawLineChart({
  title: 'svg 视频月播放量（天）',
  id: '#svg2',
  yAxis: false,
  color: '#ddd',
  data: [
    { xLabel: '一月', value: 100 },
    { xLabel: '三月', value: 200 },
    { xLabel: '五月', value: 300 },
    { xLabel: '七月', value: 200 },
    { xLabel: '九月', value: 300 },
    { xLabel: '十一月', value: 800 },
  ],
})
