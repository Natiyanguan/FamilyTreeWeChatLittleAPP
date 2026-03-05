import people from '../../data/people'
import marriages from '../../data/marriages'

// 简化版buildTree，初始状态收起
function buildTree(rootId) {
  const person = { ...people[rootId], expanded: false, highlight: false }

  // 获取该人物的所有婚姻关系
  const relatedMarriages = marriages.filter(m => m.husband === rootId)
  person.marriages = relatedMarriages.map(m => {
    const husband = { ...people[m.husband], expanded: false, highlight: false }
    const wife = m.wife ? { ...people[m.wife], expanded: false, highlight: false } : null
    const children = m.children.map(cid => buildTree(cid))
    return { id: m.id, type: m.type, husband, wife, children }
  })

  return person
}

Page({
  data: {
    treeData: null,
    searchKey: "",
    scrollLeft: 0,
    scale: 1.0, // 缩放比例
    minScale: 0.3, // 最小缩放比例
    maxScale: 2.0, // 最大缩放比例
    scaleStep: 0.1, // 缩放步长
    initialDistance: 0, // 初始双指距离
    initialScale: 1.0 // 初始缩放比例
  },

  onLoad() {
    // 构建初始树结构，只展开第一代
    const rootNode = buildTree("1");
    rootNode.expanded = true; // 只展开根节点

    this.setData({
      treeData: rootNode
    });
  },

  onSearchInput(e) {
    const value = e.detail.value.trim()
    this.setData({
      searchKey: value
    })
  },

  onSearchConfirm() {
    if (!this.data.searchKey) {
      this.resetTree(this.data.treeData)
      this.setData({ treeData: this.data.treeData })
      return
    }

    const path = []
    this.searchAndMark(this.data.treeData, this.data.searchKey, path)
    this.setData({ treeData: this.data.treeData }, () => {
      if (path.length) this.scrollToNode(path[path.length - 1])
    })
  },

  resetTree(node) {
    node.highlight = false
    node.expanded = false
    if (node.marriages) {
      node.marriages.forEach(m => {
        m.husband.highlight = false
        m.wife && (m.wife.highlight = false)
        m.husband.expanded = false
        m.wife && (m.wife.expanded = false)
        m.children.forEach(child => this.resetTree(child))
      })
    }
  },

  searchAndMark(node, keyword, path) {
    if (!node || !node.id) return false

    path.push(node.id)
    let found = false

    if (node.name && node.name.includes(keyword)) {
      node.highlight = true
      found = true
    }

    if (node.marriages && node.marriages.length) {
      for (let m of node.marriages) {
        if (m.husband.name && m.husband.name.includes(keyword)) {
          m.husband.highlight = true
          found = true
        }
        if (m.wife && m.wife.name && m.wife.name.includes(keyword)) {
          m.wife.highlight = true
          found = true
        }
        for (let child of m.children) {
          if (this.searchAndMark(child, keyword, path)) found = true
        }
        if (found) node.expanded = true
      }
    }

    if (!found) path.pop()
    return found
  },

  scrollToNode(nodeId) {
    const query = wx.createSelectorQuery()
    query.select(`#node-${nodeId}`).boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(res => {
      if (!res[0]) return;

      const nodeRect = res[0]
      const scrollOffset = res[1].scrollLeft || 0
      const systemInfo = wx.getSystemInfoSync()
      const left = nodeRect.left + scrollOffset - systemInfo.windowWidth / 2 + nodeRect.width / 2
      this.setData({ scrollLeft: left })
    })
  },

  // 双指缩放处理
  onTouchStart(e) {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )
      this.setData({
        initialDistance: distance,
        initialScale: this.data.scale
      })
    }
  },

  onTouchMove(e) {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      )

      const scaleDiff = distance / this.data.initialDistance
      let newScale = this.data.initialScale * scaleDiff

      // 限制缩放范围
      newScale = Math.max(this.data.minScale, Math.min(this.data.maxScale, newScale))

      this.setData({
        scale: newScale
      })
    }
  },

  onTouchEnd(e) {
    // 触摸结束，重置初始状态
    this.setData({
      initialDistance: 0,
      initialScale: 1.0
    })
  },

  // 缩放按钮控制
  zoomIn() {
    let newScale = this.data.scale + this.data.scaleStep
    newScale = Math.min(this.data.maxScale, newScale)
    this.setData({
      scale: newScale
    })
  },

  zoomOut() {
    let newScale = this.data.scale - this.data.scaleStep
    newScale = Math.max(this.data.minScale, newScale)
    this.setData({
      scale: newScale
    })
  },

  resetZoom() {
    this.setData({
      scale: 1.0
    })
  },

  onToggleExpand(e) {
    const { id, type } = e.detail;

    const newData = JSON.parse(JSON.stringify(this.data.treeData));

    const findAndToggle = (node) => {
      // 处理根节点
      if (node.id === id) {
        node.expanded = !node.expanded;
        return true;
      }

      // 处理婚姻关系中的节点
      if (node.marriages) {
        for (let marriage of node.marriages) {
          // 处理丈夫
          if (marriage.husband.id === id) {
            marriage.husband.expanded = !marriage.husband.expanded;
            return true;
          }

          // 处理妻子
          if (marriage.wife && marriage.wife.id === id) {
            marriage.wife.expanded = !marriage.wife.expanded;
            return true;
          }

          // 递归处理子节点
          for (let child of marriage.children) {
            if (findAndToggle(child)) return true;
          }
        }
      }

      return false;
    };

    if (findAndToggle(newData)) {
      this.setData({
        treeData: newData
      });
    }
  }
})