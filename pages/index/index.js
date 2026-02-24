import people from '../../data/people'
import marriages from '../../data/marriages'

function buildTree(rootId) {
  const person = { ...people[rootId], expanded: false, highlight: false }

  const relatedMarriages = marriages.filter(m => m.husband === rootId || m.wife === rootId)
  person.marriages = relatedMarriages.map(m => {
    const husband = { ...people[m.husband], expanded: false, highlight: false }
    const wife = m.wife ? { ...people[m.wife], expanded: false, highlight: false } : null
    const children = m.children.map(cid => buildTree(cid))
    return { id: m.id, type: m.type, husband, wife, children }
  })

  return person
}

// 新增：按丈夫分组婚姻关系的函数
function groupMarriagesByHusband() {
  const grouped = {};
  
  marriages.forEach(marriage => {
    if (!grouped[marriage.husband]) {
      grouped[marriage.husband] = [];
    }
    grouped[marriage.husband].push({
      id: marriage.id,
      husband: marriage.husband,
      wife: marriage.wife ? { ...people[marriage.wife], expanded: false, highlight: false } : null,
      children: marriage.children.map(cid => buildTree(cid)),
      type: marriage.type
    });
  });
  
  return grouped;
}

Page({
  data: {
    treeData: null, // 初始化为null
    searchKey: "",
    scrollLeft: 0
  },

  onLoad() {
    // 页面加载时构建分组的树结构
    const groupedMarriages = groupMarriagesByHusband();
    const rootNode = { 
      ...people["1"], 
      expanded: false, 
      highlight: false,
      marriages: groupedMarriages["1"] || [] // 只取第一代的婚姻关系
    };
    
    this.setData({
      treeData: rootNode
    });
    
    console.log('初始树结构构建完成');
  },

  onReady() {
    // 页面准备完成后打印完整的数据结构
    console.log('完整树结构初始化完成:');
    console.log(JSON.stringify(this.data.treeData, null, 2));
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

    if (node.name.includes(keyword)) { 
      node.highlight = true; 
      found = true;
      console.log('找到匹配节点:', node.name, 'ID:', node.id);
    }

    if (node.marriages && node.marriages.length) {
      for (let m of node.marriages) {
        if (m.husband.name.includes(keyword)) { 
          m.husband.highlight = true; 
          found = true;
          console.log('找到匹配丈夫:', m.husband.name);
        }
        if (m.wife && m.wife.name.includes(keyword)) { 
          m.wife.highlight = true; 
          found = true;
          console.log('找到匹配妻子:', m.wife.name);
        }
        
        // 确保父节点展开以便显示子节点
        for (let child of m.children) {
          if (this.searchAndMark(child, keyword, path)) {
            found = true;
            // 展开路径上的所有父节点
            node.expanded = true;
            m.husband.expanded = true;
          }
        }
        
        if (found) {
          node.expanded = true;
          m.husband.expanded = true;
        }
      }
    }

    if (!found) path.pop()
    return found
  },

  scrollToNode(nodeId) {
    // 添加延迟确保DOM已更新
    setTimeout(() => {
      const query = wx.createSelectorQuery()
      const selector = `#node-${nodeId}`
      
      query.select(selector).boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(res => {
        if (!res[0]) {
          console.log('⚠️ 未找到节点元素:', nodeId, '选择器:', selector);
          return;
        }
        
        const nodeRect = res[0]
        const scrollOffset = res[1].scrollLeft || 0
        
        const systemInfo = wx.getSystemInfoSync()
        const windowWidth = systemInfo.windowWidth
        
        const left = nodeRect.left + scrollOffset - windowWidth / 2 + nodeRect.width / 2
        console.log('滚动到位置:', left, '节点:', nodeId);
        this.setData({ scrollLeft: left })
      })
    }, 200) // 给DOM更新留出时间
  },

  onToggleExpand(e) {
    const { id, type } = e.detail;
    console.log('=== 展开/折叠处理 ===');
    console.log('目标ID:', id);
  
    // 直接操作原始数据而不是深拷贝
    const treeData = this.data.treeData;
    
    // 专门处理子节点
    const updateChildNode = (parentNode) => {
      if (!parentNode.marriages) return false;
      
      for (let marriage of parentNode.marriages) {
        for (let i = 0; i < marriage.children.length; i++) {
          const child = marriage.children[i];
          if (child.id === id) {
            console.log('✓ 找到子节点:', child.name);
            
            // 获取当前状态（检查多个可能的位置）
            const currentHusbandState = marriage.husband.expanded || false;
            const currentChildState = child.expanded || false;
            const currentState = currentHusbandState || currentChildState;
            
            console.log('原状态:', {
              child: currentChildState,
              husband: currentHusbandState,
              final: currentState
            });
            
            // 切换到相反状态
            const newState = !currentState;
            child.expanded = newState;
            marriage.husband.expanded = newState;
            
            // 关键：如果子节点本身有婚姻关系，也要同步更新
            if (child.marriages && child.marriages.length > 0) {
              child.marriages[0].husband.expanded = newState;
            }
            
            console.log('新状态:', {
              child: child.expanded,
              husband: marriage.husband.expanded,
              selfMarriage: child.marriages?.[0]?.husband.expanded
            });
            
            return true;
          }
          
          if (updateChildNode(child)) return true;
        }
      }
      return false;
    };
    
    const result = updateChildNode(treeData);
    
    if (result) {
      // 强制更新，确保组件接收到变化
      this.setData({
        treeData: treeData
      }, () => {
        console.log('✓ 界面更新完成');
        
        // 延迟验证确保数据已更新
        setTimeout(() => {
          const liEr = this.data.treeData.marriages[0].children[0];
          console.log('=== 延迟验证 ===');
          console.log('李二状态:', {
            id: liEr.id,
            name: liEr.name,
            expanded: liEr.expanded,
            marriageHusband: liEr.marriages?.[0]?.husband.expanded,
            parentMarriageHusband: this.data.treeData.marriages[0].husband.expanded
          });
        }, 200);
      });
    }
  }
})