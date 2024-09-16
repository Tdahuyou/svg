const data = [
  { text: '一季度', value: 320 },
  { text: '二季度', value: 620 },
  { text: '三季度', value: 500 },
  { text: '四季度', value: 720 },
]

const texts = data.map((obj) => obj.text)
const values = data.map((obj) => obj.value)
const maxValue = values.reduce((v1, v2) => Math.max(v1, v2))

const result = draw({
  id: '#svg',
  yAxis: false,
  color: '#acf',
  title: '2020年各季度就业人数',
  xText: texts,
  yMax: maxValue,
  part: 5,
})

const NS = 'http://www.w3.org/2000/svg'
const svg = document.querySelector('#svg')

const g = document.createElementNS(NS, 'g')
g.classList.add('pillar')
svg.appendChild(g)
values.forEach((val, i) => {
  const rect1 = document.createElementNS(NS, 'rect')
  rect1.setAttribute('x', 25 + i * result.xSpace + result.xSpace / 4)
  rect1.setAttribute('y', 25)
  rect1.setAttribute('width', result.xSpace / 2)
  rect1.setAttribute('height', 200)
  rect1.classList.add('bg')
  g.appendChild(rect1)

  const rect2 = document.createElementNS(NS, 'rect')
  rect2.setAttribute('x', 25 + i * result.xSpace + result.xSpace / 4)
  rect2.setAttribute('y', 225 - val * result.ratio)
  rect2.setAttribute('width', result.xSpace / 2)
  rect2.setAttribute('height', val * result.ratio)
  rect2.setAttribute('value', val)
  g.appendChild(rect2)
})

// 扩展，数据提醒
const panel = document.querySelector('#data-panel')
svg.onmouseover = function (e) {
  if (e.target.tagName == 'rect' && !e.target.classList.contains('bg')) {
    function show(e) {
      panel.innerHTML = e.target.getAttribute('value')
      panel.style.left = e.clientX + 10 + 'px'
      panel.style.top = e.clientY + 5 + 'px'
      panel.style.display = 'block'
    }
    show(e)

    e.target.onmousemove = function (e) {
      show(e)
    }

    e.target.onmouseout = function () {
      panel.style.display = 'none'
      this.onmousemove = null
      this.onmouseout = null
    }
  }
}
