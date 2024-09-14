function draw(arg) {
  typeof arg === 'string' && (arg = { id: arg })

  const DEFAULT_CONFIG = {
    title: '动态坐标系的标题',
    titleColor: 'orange',
    color: 'gray',
    xAxis: true, // x 轴是否可见
    yAxis: true, // y 轴是否可见
  }

  const config = {
    ...DEFAULT_CONFIG,
    ...arg,
  }

  const svg = document.querySelector(config.id)
  const NS = 'http://www.w3.org/2000/svg'

  svg.setAttribute('viewBox', '0 0 250 250')

  const g = document.createElementNS(NS, 'g')

  const title = document.createElementNS(NS, 'text')
  g.appendChild(title)

  title.innerHTML = config.title
  title.setAttribute('x', 2)
  title.setAttribute('y', 8)
  title.setAttribute('font-size', 6)
  title.setAttribute('fill', config.titleColor)

  const path = document.createElementNS(NS, 'path')
  g.appendChild(path)

  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', config.color)
  path.setAttribute('stroke-width', 0.5)

  let d = ''
  //绘制坐标系横纵线
  for (let i = 0; i < 11; i++) {
    if (config.xAxis) d += `M25 ${25 + i * 20}H225`
    if (config.yAxis) d += `M${25 + i * 20} 25V225`
  }
  path.setAttribute('d', d)

  const children = svg.children

  if (children && children.length) {
    svg.insertBefore(g, children[0])
  } else {
    svg.appendChild(g)
  }
}
