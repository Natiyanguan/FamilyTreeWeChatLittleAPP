// 本家成员编号递增，娶进门的成员编号为本家配偶的编号加s(spouse)
const people = {
  // 一代
  "1": { id: "1", name: "李氏先人", gender: "male", type: "member", avatar: "", adopted: false },
  "1s": { id: "1s", name: "不详", gender: "female", type: "spouse", avatar: "", adopted: false },
  // 二代
  "2": { id: "2", name: "李三德（三巴）", gender: "male", type: "member", avatar: "", adopted: false },
  "2s": { id: "2s", name: "不详", gender: "female", type: "spouse", avatar: "", adopted: false },
  "3": { id: "3", name: "李二德", gender: "male", type: "member", avatar: "", adopted: false },
  "3s": { id: "3s", name: "不详", gender: "female", type: "spouse", avatar: "", adopted: false },
  "3s-2": { id: "3s-2", name: "霍氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "4": { id: "4", name: "李大德", gender: "male", type: "member", avatar: "", adopted: false },
  "4s": { id: "4s", name: "不详", gender: "female", type: "spouse", avatar: "", adopted: false },
  // 三代
  "5": { id: "5", name: "李三黑（老林）", gender: "male", type: "member", avatar: "", adopted: true },
  "5s": { id: "5s", name: "冯氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "6": { id: "6", name: "李应贵", gender: "male", type: "member", avatar: "", adopted: false },
  "6s": { id: "6s", name: "常氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "7": { id: "7", name: "李二黑（老清）", gender: "male", type: "member", avatar: "", adopted: false },
  "7s": { id: "7s", name: "不详", gender: "female", type: "spouse", avatar: "", adopted: false },
  "8": { id: "8", name: "李大黑", gender: "male", type: "member", avatar: "", adopted: false },
  "8s": { id: "8s", name: "杨氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  // 四代
  "9": { id: "9", name: "李正月", gender: "male", type: "member", avatar: "", adopted: false },
  "9s": { id: "9s", name: "牛莲姐", gender: "female", type: "spouse", avatar: "", adopted: false },
  "10": { id: "10", name: "李老福", gender: "male", type: "member", avatar: "", adopted: false },
  "10s": { id: "10s", name: "杨云姐", gender: "female", type: "spouse", avatar: "", adopted: false },
  "11": { id: "11", name: "李先亮", gender: "male", type: "member", avatar: "", adopted: false },
  "11s": { id: "11s", name: "杨瑞玲", gender: "female", type: "spouse", avatar: "", adopted: false },
  "12": { id: "12", name: "不详（发发村）", gender: "female", type: "member", avatar: "", adopted: false },
  "13": { id: "13", name: "不详（向阳村）", gender: "female", type: "member", avatar: "", adopted: false },
  "14": { id: "14", name: "李先明", gender: "male", type: "member", avatar: "", adopted: false },
  "14s": { id: "14s", name: "韩氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "15": { id: "15", name: "不详（易家庄）", gender: "female", type: "member", avatar: "", adopted: false },
  "16": { id: "16", name: "不详（台子沟）", gender: "female", type: "member", avatar: "", adopted: false },
  "17": { id: "17", name: "不详", gender: "female", type: "member", avatar: "", adopted: false },
  "18": { id: "18", name: "李翠姐", gender: "female", type: "member", avatar: "", adopted: false },
  "19": { id: "19", name: "李明显", gender: "male", type: "member", avatar: "", adopted: false },
  "19s": { id: "19s", name: "安用姐", gender: "female", type: "spouse", avatar: "", adopted: false },
  "20": { id: "20", name: "李卫姐", gender: "female", type: "member", avatar: "", adopted: false },
  "21": { id: "21", name: "李江姐", gender: "female", type: "member", avatar: "", adopted: false },
  "22": { id: "22", name: "李吉山（下子洋）", gender: "male", type: "member", avatar: "", adopted: true },
  "22s": { id: "22s", name: "高氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "23": { id: "23", name: "李付妮", gender: "female", type: "member", avatar: "", adopted: false },
  "24": { id: "24", name: "李记妮", gender: "female", type: "member", avatar: "", adopted: false },
  "25": { id: "25", name: "李老领", gender: "male", type: "member", avatar: "", adopted: true },
  "25s": { id: "25s", name: "孟氏", gender: "female", type: "spouse", avatar: "", adopted: false },
  "26": { id: "26", name: "李小喜（麻琅）", gender: "male", type: "member", avatar: "", adopted: false },
  "26s": { id: "26s", name: "高大妮", gender: "female", type: "spouse", avatar: "", adopted: false },



  // "5s": { id: "5s", name: "魏氏", gender: "female", type: "spouse", avatar: "/images/w1.jpg", adopted: false }

}

export default people;