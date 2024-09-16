/*
会返回一个result{xSapce , ratio}
*/
function draw(arg) {
  const result = {}
  
  function drawBox(arg) {
    // 会在250*250的空间中绘制 200*200的坐标系
    // 四周留白25px
    // 坐标系分成10分，每一份20px

    if (typeof arg === 'string') {
      arg = { id: arg }
    }

    const config = {
      title: '标题',
      titleColor: '#fac',
      color: '#ccc',
      xAxis: true,
      yAxis: true,
      ...arg,
    }

    const svg = document.querySelector(config.id)
    const NS = 'http://www.w3.org/2000/svg'
    svg.setAttribute('viewBox', '0 0 250 250')

    // 绘制标题
    const g = document.createElementNS(NS, 'g')
    const title = document.createElementNS(NS, 'text')
    title.innerHTML = config.title
    title.setAttribute('x', 10)
    title.setAttribute('y', 15)
    title.setAttribute('font-size', 8)
    title.setAttribute('fill', config.titleColor)
    g.appendChild(title)

    // 绘制网格线
    const path = document.createElementNS(NS, 'path')
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', config.color)
    path.setAttribute('stroke-width', '0.8')
    let d = ''
    for (let i = 0; i < 11; i++) {
      if (config.xAxis) d += `M25 ${25 + i * 20}H225`
      if (config.yAxis) d += `M${25 + i * 20} 25V225`
    }
    path.setAttribute('d', d)
    g.appendChild(path)

    // 有子标签， 坐标系path放在第一个子标签的前面
    const children = svg.children
    if (children && children.length > 0) {
      svg.insertBefore(g, children[0])
    } else {
      svg.appendChild(g)
    }
  }

  // 绘制 x、y 轴的文本
  function drawLabel(arg) {
    const config = {
      ...arg,
    }

    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.querySelector(config.id)
    // 绘制 x 轴的文本区域
    if (config.xText && config.xText.length > 0) {
      const xSpace = 200 / config.xText.length
      result.xSpace = xSpace

      // 绘制分割线
      let g = document.createElementNS(NS, 'g')
      g.classList.add('x-line')
      svg.appendChild(g)
      let d = ''
      for (let i = 0; i <= config.xText.length; i++) {
        d += `M${25 + i * xSpace} 225V230`
      }
      const path = document.createElementNS(NS, 'path')
      path.setAttribute('d', d)
      g.appendChild(path)

      // 绘制文字
      g = document.createElementNS(NS, 'g')
      g.classList.add('x-text')
      svg.appendChild(g)
      config.xText.forEach((txt, i) => {
        const text = document.createElementNS(NS, 'text')
        text.innerHTML = txt
        text.setAttribute('x', 25 + i * xSpace + xSpace / 2)
        text.setAttribute('y', 235)
        g.appendChild(text)
      })
    }

    // 绘制 y 轴的文本区域
    if (config.yMax > 0 && config.part > 0) {
      const upLimit = calcUpLimit(config.yMax)
      const ratio = 200 / upLimit
      result.ratio = ratio
      const yDataSpace = upLimit / config.part
      const ySpace = 200 / config.part
      const g = document.createElementNS(NS, 'g')
      g.classList.add('y-text')
      svg.appendChild(g)
      for (let i = 0; i <= config.part; i++) {
        const text = document.createElementNS(NS, 'text')
        text.setAttribute('x', 20)
        text.setAttribute('y', 225 - i * ySpace)
        text.innerHTML = i * yDataSpace
        g.appendChild(text)
      }
    }
  }

  drawBox(arg)
  drawLabel(arg)

  return result
}

function calcUpLimit(maxValue) {
  const len = (maxValue + '').length
  const unit = Math.pow(10, len - 1)
  return (
    (maxValue % unit == 0 ? maxValue : parseInt(maxValue / unit) * unit) + unit
  )
}
