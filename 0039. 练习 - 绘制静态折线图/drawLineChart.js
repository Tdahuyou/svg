const NS = 'http://www.w3.org/2000/svg'
const LINE_CHART_WIDTH = 200
const LINE_CHART_HEIGHT = 200

function drawLineChart({ title, id, yAxis, color, data }) {
  // draw 会在 250*250 的空间中绘制 200*200 的坐标系。
  // 四周留白 25px，坐标系分成 10 份，每一份 20px。
  draw({
    title,
    id,
    yAxis,
    color,
  })

  const maxValue = calculateMaxValue(data)
  const upLimit = calculateUpperLimit(maxValue)

  const svg = document.querySelector(id)

  drawYAxisValues(svg, upLimit, 5)
  drawXAxisLines(svg, data.length)
  drawXAxisLabels(svg, data, LINE_CHART_WIDTH)

  // 计算数据值的缩放比例
  const ratio = LINE_CHART_HEIGHT / upLimit

  drawDataLine(svg, data, ratio, LINE_CHART_WIDTH)
  drawDataCircles(svg, data, ratio, LINE_CHART_WIDTH)

  // 鼠标点在圆点上，显示对应数值
  svg.addEventListener('mouseover', function (e) {
    if (e.target.tagName === 'circle') {
      const left = e.clientX + 5 + 'px'
      const top = e.clientY + 5 + 'px'
      const panel = document.querySelector('#data-panel')
      panel.style.left = left
      panel.style.top = top
      panel.style.display = 'block'
      panel.innerHTML = e.target.getAttribute('value')

      e.target.onmouseout = function () {
        panel.style.display = 'none'
        e.target.onmouseout = null
      }
    }
  })
}

/**
 * 计算上限值
 *
 * 根据给定的最大值，计算一个更高的基准上限值。基准为：
 * - 三位数基准为 100 —— 10^2
 * - 四位数基准为 1000 —— 10^3
 * - 以此类推
 *
 * @param {number} maxValue - 要计算的最大值
 * @returns {number} - 计算后的上限值
 */
function calculateUpperLimit(maxValue) {
  const numberOfDigits = (maxValue + '').length
  const baseUnit = Math.pow(10, numberOfDigits - 1)

  // 如果 maxValue 已经是基准的整数倍，则直接返回 maxValue
  if (maxValue % baseUnit === 0) {
    return maxValue
  }

  // 否则，计算下一个基准的整数倍
  const upperLimit = (Math.floor(maxValue / baseUnit) + 1) * baseUnit
  return upperLimit
}

/**
 * 计算数据中的最大值
 *
 * @param {Array} data - 数据数组，每个元素包含 xLabel 和 value
 * @returns {number} - 数据中的最大值
 */
function calculateMaxValue(data) {
  return data.map((obj) => obj.value).reduce((v1, v2) => Math.max(v1, v2))
}

/**
 * 绘制Y轴数值
 *
 * @param {Element} svg - SVG 元素
 * @param {number} upLimit - 上限值
 * @param {number} count - 分段数
 */
function drawYAxisValues(svg, upLimit, count) {
  const yDataSpace = upLimit / count
  const ySpace = LINE_CHART_HEIGHT / count

  let g = document.createElementNS(NS, 'g')
  g.classList.add('y-text')
  svg.appendChild(g)

  for (let i = 0; i <= count; i++) {
    const text = document.createElementNS(NS, 'text')
    text.innerHTML = i * yDataSpace
    text.setAttribute('x', 20)
    text.setAttribute('y', 225 - i * ySpace)
    g.appendChild(text)
  }
}

/**
 * 绘制X轴分割线
 *
 * @param {Element} svg - SVG 元素
 * @param {number} dataLength - 数据长度
 */
function drawXAxisLines(svg, dataLength) {
  const xSpace = LINE_CHART_WIDTH / dataLength
  let g = document.createElementNS(NS, 'g')
  g.classList.add('x-line')
  svg.appendChild(g)

  let d = ''
  for (let i = 0; i <= dataLength; i++) {
    d += `M${25 + i * xSpace} 225V230`
  }

  const path = document.createElementNS(NS, 'path')
  path.setAttribute('d', d)
  g.appendChild(path)
}

/**
 * 绘制X轴标签
 *
 * @param {Element} svg - SVG 元素
 * @param {Array} data - 数据数组，每个元素包含 xLabel 和 value
 */
function drawXAxisLabels(svg, data) {
  const xSpace = LINE_CHART_WIDTH / data.length
  let g = document.createElementNS(NS, 'g')
  g.classList.add('x-text')
  svg.appendChild(g)

  data.forEach((obj, i) => {
    const text = document.createElementNS(NS, 'text')
    text.innerHTML = obj.xLabel
    text.setAttribute('x', 25 + i * xSpace + xSpace / 2)
    text.setAttribute('y', 235)
    g.appendChild(text)
  })
}

/**
 * 绘制数据折线
 *
 * @param {Element} svg - SVG 元素
 * @param {Array} data - 数据数组，每个元素包含 xLabel 和 value
 * @param {number} ratio - 缩放比例
 * @param {number} chartWidth - 图表宽度
 */
function drawDataLine(svg, data, ratio, chartWidth) {
  const xSpace = chartWidth / data.length
  let points = ''

  data.forEach((obj, i) => {
    points += `${25 + i * xSpace + xSpace / 2} ${225 - obj.value * ratio}`
    if (i < data.length - 1) {
      points += ','
    }
  })

  const polyline = document.createElementNS(NS, 'polyline')
  polyline.classList.add('data-line')
  polyline.setAttribute('points', points)
  svg.appendChild(polyline)
}

/**
 * 绘制数据圆点
 *
 * @param {Element} svg - SVG 元素
 * @param {Array} data - 数据数组，每个元素包含 xLabel 和 value
 * @param {number} ratio - 缩放比例
 * @param {number} chartWidth - 图表宽度
 */
function drawDataCircles(svg, data, ratio, chartWidth) {
  const xSpace = chartWidth / data.length
  let g = document.createElementNS(NS, 'g')
  g.classList.add('data-circle')
  svg.appendChild(g)

  data.forEach((obj, i) => {
    const circle = document.createElementNS(NS, 'circle')
    circle.setAttribute('cx', 25 + i * xSpace + xSpace / 2)
    circle.setAttribute('cy', 225 - obj.value * ratio)
    circle.setAttribute('value', obj.value)
    g.appendChild(circle)
  })
}
