// type：normal  / uxorilocal(招赘)
// 婚姻关系及子女
const marriages = [
    // 一代
  { id: "m1", husband: "1", wife: "1s", children: ["2", "3", "4"], type: "marriage" },
    // 二代
  { id: "m2", husband: "2", wife: "2s", children: ["5"], type: "marriage" },
  { id: "m3", husband: "3", wife: "3s", children: ["6"], type: "marriage" },
  { id: "m3-2", husband: "3", wife: "3s-2", children: ["7"], type: "marriage" },
  { id: "m4", husband: "4", wife: "4s", children: ["8"], type: "marriage" },
    // 三代
  { id: "m5", husband: "5", wife: "5s", children: ["9", "10"], type: "marriage" },
  { id: "m6", husband: "6", wife: "6s", children: ["11", "12", "13", "14", "15", "16"], type: "marriage" },
  { id: "m7", husband: "7", wife: "7s", children: ["17", "18", "19", "20", "21"], type: "marriage" },
  { id: "m8", husband: "8", wife: "8s", children: ["22", "23", "24", "25", "26"], type: "marriage" },
    // 四代
  { id: "m9", husband: "9", wife: "9s", children: ["27"], type: "marriage" },
  { id: "m10", husband: "10", wife: "10s", children: ["28", "29", "30", "31", "32"], type: "marriage" },
  { id: "m11", husband: "11", wife: "11s", children: ["33", "34", "35", "36", "37"], type: "marriage" },
  { id: "m14", husband: "14", wife: "14s", children: ["54", "55", "56"], type: "marriage" },
  { id: "m19", husband: "19", wife: "19s", children: ["38", "39", "40", "41", "42", "43", "44"], type: "marriage" },
  { id: "m22", husband: "22", wife: "22s", children: [], type: "marriage" },
  { id: "m25", husband: "25", wife: "25s", children: ["45", "46", "47", "48"], type: "marriage" },
  { id: "m26", husband: "26", wife: "26s", children: ["49", "50", "51", "52", "53"], type: "marriage" },
  // 五代
  { id: "m27", husband: "27", wife: "27s", children: ["57", "58", "59", "60"], type: "marriage" },
  { id: "m29", husband: "29", wife: "29s", children: ["61", "62", "63"], type: "marriage" },
  { id: "m32", husband: "32", wife: "32s", children: ["64", "65", "66", "67"], type: "marriage" },
  { id: "m36", husband: "36", wife: "36s", children: ["68", "69"], type: "marriage" },
  { id: "m37", husband: "37", wife: "37s", children: ["70", "71", "72", "73"], type: "marriage" },
  { id: "m54", husband: "54", wife: "54s", children: ["74", "93", "94", "95"], type: "marriage" },
  { id: "m38", husband: "38", wife: "38s", children: ["75", "76", "77"], type: "marriage" },
  { id: "m41", husband: "41", wife: "41s", children: ["78", "79", "80"], type: "marriage" },
  { id: "m43", husband: "43", wife: "43s", children: ["81"], type: "marriage" },
  { id: "m44", husband: "44", wife: "44s", children: ["82", "83", "84"], type: "marriage" },
  { id: "m46", husband: "46", wife: "46s", children: ["85", "86", "87", "88"], type: "marriage" },
  { id: "m48", husband: "48", wife: "48s", children: ["89", "90", "91", "92"], type: "marriage" },
  // 六代
  { id: "m57", husband: "57", wife: "57s", children: ["96", "97"], type: "marriage" },
  { id: "m60", husband: "60", wife: "60s", children: ["98", "99", "100"], type: "marriage" },
  { id: "m61", husband: "61", wife: "61s", children: ["101"], type: "marriage" },
  { id: "m65", husband: "65", wife: "65s", children: ["102"], type: "marriage" },
  { id: "m66", husband: "66", wife: "66s", children: ["103"], type: "marriage" },
  { id: "m68", husband: "68", wife: "68s", children: ["104", "105"], type: "marriage" },
  { id: "m71", husband: "71", wife: "71s", children: ["106"], type: "marriage" },
  { id: "m73", husband: "73", wife: "73s", children: ["107"], type: "marriage" },
  { id: "m76", husband: "76", wife: "76s", children: ["110", "111", "112"], type: "marriage" },
  { id: "m95", husband: "95", wife: "95s", children: ["108", "109"], type: "marriage" },
  { id: "m77", husband: "77", wife: "77s", children: ["113", "114"], type: "marriage" },
  { id: "m79", husband: "79", wife: "79s", children: ["115", "116"], type: "marriage" },
  { id: "m80", husband: "80", wife: "80s", children: ["117", "118"], type: "marriage" },
  { id: "m81", husband: "81", wife: "81s", children: ["119"], type: "marriage" },
  { id: "m83", husband: "83", wife: "83s", children: ["120", "121", "122"], type: "marriage" },
  { id: "m87", husband: "87", wife: "87s", children: ["123", "124"], type: "marriage" },
  { id: "m88", husband: "88", wife: "88s", children: ["125"], type: "marriage" },
  { id: "m92", husband: "92", wife: "92s", children: ["126", "127"], type: "marriage" },
  // 七代
  { id: "m96", husband: "96", wife: "96s", children: ["128", "129"], type: "marriage" },
  { id: "m97", husband: "97", wife: "97s", children: ["130", "131", "132"], type: "marriage" },
  { id: "m119", husband: "119", wife: "119s", children: [], type: "marriage" },
  { id: "m121", husband: "121", wife: "121s", children: ["133"], type: "marriage" },
  { id: "m122", husband: "122", wife: "122s", children: ["134"], type: "marriage" },
  { id: "m124", husband: "124", wife: "124s", children: ["135", "136"], type: "marriage" },
  { id: "m126", husband: "126", wife: "126s", children: ["137", "138", "139"], type: "marriage" },
  { id: "m127", husband: "127", wife: "127s", children: ["140", "141"], type: "marriage" },

]

export default marriages;