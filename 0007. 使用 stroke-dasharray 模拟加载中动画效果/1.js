const c = document.querySelector('#c')

// 设置虚线及偏移
const len = c.getTotalLength()
// console.log('len:', len)

c.setAttribute('stroke-dasharray', len)
c.setAttribute('stroke-dashoffset', len)

c.getBoundingClientRect() // 强制渲染

const colors = [
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
c.setAttribute('stroke', colors[colorIndex])

c.ontransitionend = function (e) {
  // stroke-dashoffset 不断自增
  if (e.propertyName === 'stroke-dashoffset') {
    updateStrokeDashoffset()
  }
  // 每一圈设置不同的颜色
  if (e.propertyName === 'stroke') {
    c.setAttribute('stroke', colors[++colorIndex % colors.length])
  }
}

c.style['transition'] = 'all 1s linear'
updateStrokeDashoffset() // 开启动画效果

function updateStrokeDashoffset() {
  c.setAttribute(
    'stroke-dashoffset',
    Number(c.getAttribute('stroke-dashoffset')) + len
  )
}
