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
    scrollLeft: 0
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
    this.resetTree(this.data.treeData)
    if (!value) {
      this.setData({ treeData: this.data.treeData })
      return
    }
    const path = []
    this.searchAndMark(this.data.treeData, value, path)
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
    path.push(node.id)
    let found = false

    if (node.name.includes(keyword)) { node.highlight = true; found = true }

    if (node.marriages && node.marriages.length) {
      for (let m of node.marriages) {
        if (m.husband.name.includes(keyword)) { m.husband.highlight = true; found = true }
        if (m.wife && m.wife.name.includes(keyword)) { m.wife.highlight = true; found = true }
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