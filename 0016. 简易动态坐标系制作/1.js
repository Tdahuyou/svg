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

  // 在 120 * 120 的空间中绘制 100 * 100 的坐标系。
  // 将坐标系横向、纵向各分为 10 等分。
  // 四周会有 10 的边距。
  svg.setAttribute('viewBox', '0 0 120 120')

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
  for (let i = 10; i <= 110; i += 10) {
    if (config.xAxis) {
      d += `M10 ${i} H110 `
    }
    if (config.yAxis) {
      d += `M${i} 10 V110 `
    }
  }
  path.setAttribute('d', d)

  const children = svg.children

  if (children && children.length) {
    svg.insertBefore(g, children[0])
  } else {
    svg.appendChild(g)
  }
}
