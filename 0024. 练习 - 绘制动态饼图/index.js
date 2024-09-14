draw({
  title: '前端各课程时长(h)',
  id: '#svg',
  xAxis: true,
  yAxis: true,
})

const COORD_GAP = 25

const ORIGIN_POINT = { x: 100, y: 100 } // 表示圆心坐标

const r1 = 80 // 正常绘制弧的半径
const r2 = 82 // 高亮时绘制弧的半径
const r3 = 85 // 计算提示线的弧的半径

const data = [
  { text: 'HTML5+CSS3', value: 300 },
  { text: 'JS', value: 300 },
  { text: 'NodeJS', value: 400 },
  { text: 'Vue', value: 400 },
  { text: 'React', value: 100 },
]

// 计算数据的总值，后面用来计算角度 deg/360 === value/sum
const sum = data.map((obj) => obj.value).reduce((v1, v2) => v1 + v2)

const NS = 'http://www.w3.org/2000/svg'
const svg = document.querySelector('#svg')
const tooltip = document.querySelector('#data-panel') // 实现鼠标移入移出时的动态显示提示面板

let startPoint = { x: 100, y: 20 } // 绘制弧形的开始位置（下次绘制的开始位置是上个圆弧的结束位置）
let lastDeg = 0 // 上一个圆弧结束位置的角度值

data.forEach((obj, i) => {
  const g = document.createElementNS(NS, 'g')
  g.classList.add('part')
  g.setAttribute('text', obj.text)
  g.setAttribute('value', obj.value)
  svg.appendChild(g)

  const color = randomColor()
  const currDeg = caclDeg(obj.value, sum)
  const endPoint = calcPoint(ORIGIN_POINT, r1, currDeg + lastDeg)
  // 注意大圆小圆问题。角度 >180 画大圆。 否则画小圆
  const flag = currDeg >= 180 ? 1 : 0
  g.setAttribute('currDeg', currDeg)
  g.setAttribute('lastDeg', lastDeg)

  // 绘制圆弧
  const path = document.createElementNS(NS, 'path')
  const d = `
    M${COORD_GAP + ORIGIN_POINT.x} ${COORD_GAP + ORIGIN_POINT.y}
    L${COORD_GAP + startPoint.x} ${COORD_GAP + startPoint.y}
    A${r1} ${r1} 0 ${flag} 1 ${COORD_GAP + endPoint.x} ${COORD_GAP + endPoint.y}
    Z
  `
  path.setAttribute('fill', color)
  path.setAttribute('d', d)
  g.appendChild(path)

  // 绘制折线
  // 基于当前数据弧对应角度的一半 + r3 半径来计算折线点。
  const polyPoint = calcPoint(ORIGIN_POINT, r3, currDeg / 2 + lastDeg)
  const polyline = document.createElementNS(NS, 'polyline')
  const unit = polyPoint.x >= ORIGIN_POINT.x ? 5 : -5
  const points = `${COORD_GAP + ORIGIN_POINT.x} ${COORD_GAP + ORIGIN_POINT.y} ,
        ${COORD_GAP + polyPoint.x} ${COORD_GAP + polyPoint.y} ,
        ${COORD_GAP + polyPoint.x + unit} ${COORD_GAP + polyPoint.y}`
  polyline.setAttribute('stroke', color)
  polyline.setAttribute('points', points)
  g.appendChild(polyline)

  // 绘制文字
  const text = document.createElementNS(NS, 'text')
  text.setAttribute('x', COORD_GAP + polyPoint.x + unit + unit)
  text.setAttribute('y', COORD_GAP + polyPoint.y + 3)
  text.innerHTML = obj.text
  if (unit < 0) {
    text.classList.add('left')
  }
  g.appendChild(text)

  startPoint = endPoint
  lastDeg += currDeg
})

svg.onmouseover = function (e) {
  const target = e.target.parentNode

  if (target.tagName === 'g' && target.classList.contains('part')) {
    // 获取弧片段的相关属性
    const text = target.getAttribute('text')
    const value = target.getAttribute('value')
    const currDeg = target.getAttribute('currDeg')
    const lastDeg = target.getAttribute('lastDeg')

    const path = target.querySelector('path')

    // 显示提示面板
    function showTooltip(e) {
      tooltip.innerHTML = `${text} : ${value}`
      tooltip.style.display = 'block'
      tooltip.style.left = `${e.clientX + 10}px`
      tooltip.style.top = `${e.clientY + 5}px`
    }
    showTooltip(e)

    // 绘制高亮弧形
    function drawArc(origin, radius, currDeg, lastDeg) {
      const startPoint = calcPoint(origin, radius, lastDeg)
      const endPoint = calcPoint(
        origin,
        radius,
        parseFloat(currDeg) + parseFloat(lastDeg)
      )
      const largeArcFlag = currDeg >= 180 ? 1 : 0

      const d = `
        M${COORD_GAP + origin.x} ${COORD_GAP + origin.y}
        L${COORD_GAP + startPoint.x} ${COORD_GAP + startPoint.y}
        A${radius} ${radius} 0 ${largeArcFlag} 1 ${COORD_GAP + endPoint.x} ${
        COORD_GAP + endPoint.y
      }
        Z
      `
      path.setAttribute('d', d)
    }
    drawArc(ORIGIN_POINT, r3, currDeg, lastDeg)

    e.target.onmousemove = showTooltip

    e.target.onmouseout = function () {
      tooltip.style.display = 'none'
      drawArc(ORIGIN_POINT, r1, currDeg, lastDeg)
      this.onmouseout = null
      this.onmousemove = null
    }
  }
}

// 随机产生一个颜色数字（有效值在 0-255 即可）
function randomColorNumber() {
  return parseInt(Math.random() * 101) + 150
}

// 随机产生颜色
function randomColor() {
  return `rgb(${randomColorNumber()},${randomColorNumber()},${randomColorNumber()})`
}

// 计算圆弧上的点（默认右上角象限，与 y 轴夹角）
function calcPoint(origin, r, deg) {
  return {
    x: origin.x + Math.sin((deg * Math.PI) / 180) * r,
    y: origin.y - Math.cos((deg * Math.PI) / 180) * r,
  }
}

// 计算当前部分数据所对应的角度。
function caclDeg(currValue, sumValue) {
  return (currValue / sumValue) * 360
}
