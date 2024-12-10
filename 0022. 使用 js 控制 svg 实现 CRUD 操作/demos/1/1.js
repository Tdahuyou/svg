/**
 * 可以使用 js 的 dom 来操作 svg 标签，与之前的 dom 操作基本相同。
 * 
 * 【创建 svg 标签】
 * document.createElementNS(namespaceURI, qualifiedName)
 * namespaceURI 表示 svg 标签的命名空间，在 svg 标签中，这个值是固定的。比如：'http://www.w3.org/2000/svg'、'http://www.w3.org/1999/xhtml' 等。
 * qualifiedName 表示 svg 标签的名字，比如：circle、rect 等。
 * 
 * 创建 svg 标签的时候，需要指定命名空间，否则标签可以创建，属性可以设置，但浏览器却无法正常渲染它。有关命名空间的介绍，见笔记 svg.0046
 * 
 * 【查找 svg 标签】
 * 做法跟 dom 操作是一样的。
 * 比如：
 * const svg = document.getElementsByTagName('svg')[0]
 * document.getElementById()
 * document.getElementsByTagName()
 * document.getElementsByClassName()
 * document.getElementsByName()
 * document.querySelector()
 * document.querySelectorAll()
 * ...
 * 
 * 【读写 svg 标签的属性值】
 * 注意点：在读写 svg 标签的属性值的时候（比如 circle 元素的圆心 cx、cy，半径 r），不能直接 `circle.r = xxx` 的方式操作属性，应该使用 `circle.setAttribute(r, xxx)` 和 `svg.getAttribute(r)` 方法操作属性。
 * 
 * 正确做法：
 * circle.setAttribute('cx',50) // 写
 * circle.getAttribute('cx') // 读
 * 
 * 错误做法：
 * circle.cx = 50 // 无效
 * 
 * 【给 svg 标签绑定事件】
 * 做法跟 DOM 操作一致。
 * 比如：
 * svgElement.onclick = function(e) {}
 * svgElement.onmouseover = function(e) {}
 */

const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
const svg = document.getElementsByTagName('svg')[0]


svg.appendChild(circle) // 将 svg 标签添加到指定容器中

// 读写 svg 标签的属性值
circle.setAttribute('cx', 50)
circle.setAttribute('cy', 50)
circle.setAttribute('r', 20)
circle.style.fill = 'red'
circle.style.opacity = 0.2
circle.style.transition = 'all 1s'

console.log('圆的半径是：', circle.getAttribute('r')) // 圆的半径是： 20

// 给 svg 标签绑定事件
circle.onmouseover = () => {
  circle.setAttribute('r', 40)
  circle.style.fill = 'orange'
  circle.onmouseout = () => {
    circle.setAttribute('r', 20)
    circle.onmouseout = null
    circle.style.fill = 'red'
  }
}

// 读取 svg 标签的计算后样式
console.log('getComputedStyle(circle).fill =>', getComputedStyle(circle).fill)
// getComputedStyle(circle).fill => rgb(255, 0, 0)

// 删除 svg 标签
circle.ondblclick = function () {
  const b = confirm('是否确认移除')
  if (b) {
    svg.removeChild(circle)
  }
}
