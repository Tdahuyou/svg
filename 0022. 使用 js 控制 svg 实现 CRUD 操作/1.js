// 可以使用 js 的 dom 来操作 svg 标签，与之前的 dom 操作基本相同。

// #region 创建 svg 标签
const cricle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
// Document.createElementNS(namespaceURI, qualifiedName)
// namespaceURI
// 创建 svg 标签的时候，需要指定命名空间，否则标签可以创建，属性可以设置，但没有效果。

// 所有的 svg 标签都可以创建，比如：circle、rect 等。
// 比如：创建 svg cricle 标签，可以这么写：
// document.createElementNS('http://www.w3.org/2000/svg','circle')
// #endregion 创建 svg 标签

// #region 查找 svg 标签
const svg = document.getElementsByTagName('svg')[0]
// 做法跟 dom 操作是一样的。
// document.getElementById()
// document.getElementsByTagName()
// document.getElementsByClassName()
// document.getElementsByName()
// document.querySelector()
// document.querySelectorAll()
// ...
// #endregion 查找 svg 标签

// 将 svg 标签添加到指定容器中
svg.appendChild(cricle)

// #region 读写 svg 标签的属性
cricle.setAttribute('cx', 50)
cricle.setAttribute('cy', 50)
cricle.setAttribute('r', 20)
cricle.style.fill = 'red'
cricle.style.opacity = 0.2
cricle.style.transition = 'all 1s'

console.log('圆的半径是：', cricle.getAttribute('r')) // 圆的半径是： 20

// 注意：不能直接 标签.属性名 的方式操作属性，只能使用 set 和 get 方法操作属性。

// 正确做法：
// circle.setAttribute('cx',50) // 写
// circle.getAttribute('cx') // 读

// 错误做法：
// circle.cx = 50 // 无效

// #endregion 读写 svg 标签的属性

// 给 svg 标签绑定事件
cricle.onmouseover = function () {
  this.setAttribute('r', 40)
  this.style.fill = 'orange'
  this.onmouseout = function () {
    this.setAttribute('r', 20)
    this.onmouseout = null
    this.style.fill = 'red'
  }
}

// 读取 svg 标签的计算后样式
console.log('getComputedStyle(cricle).fill =>', getComputedStyle(cricle).fill)
// getComputedStyle(cricle).fill => rgb(255, 0, 0)

// 删除 svg 标签
cricle.ondblclick = function () {
  const b = confirm('是否确认移除')
  if (b) {
    svg.removeChild(cricle)
  }
}
