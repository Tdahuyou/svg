const COLORS = [
  '#fac',
  '#caf',
  '#f00',
  '#ff0',
  'skyblue',
  'darkmagenta',
  'lightgreen',
  'brown',
]
let colorIndex = 0

const circleSvgEle = document.querySelector('#circle')
const len = circleSvgEle.getTotalLength()
// console.log('len:', len)

// stroke-dasharray 虚线设置为周长的大小，即两个线段之间的间距正好就是一圈。
circleSvgEle.setAttribute('stroke-dasharray', len)
circleSvgEle.setAttribute('stroke-dashoffset', 0)
circleSvgEle.setAttribute('stroke', COLORS[colorIndex])

// 配置过渡参数，其中 1s 表示转一圈需要的时间。
circleSvgEle.style['transition'] = 'all 1s linear'
// circleSvgEle.style['transition'] = 'all 10s linear'

circleSvgEle.getBoundingClientRect() // 强制渲染


// 让 stroke-dashoffset 自增，增加的大小就是 circle 的周长，也就是转一圈。
const updateStrokeDashoffset = _ => circleSvgEle.setAttribute('stroke-dashoffset', Number(circleSvgEle.getAttribute('stroke-dashoffset')) + len)

// 监听过渡效果结束事件
circleSvgEle.ontransitionend = (e) => {
  // stroke-dashoffset 不断自增
  if (e.propertyName === 'stroke-dashoffset') updateStrokeDashoffset()
  // 每一圈设置不同的颜色
  if (e.propertyName === 'stroke') circleSvgEle.setAttribute('stroke', COLORS[++colorIndex % COLORS.length])
}

updateStrokeDashoffset() // 开启动画效果
