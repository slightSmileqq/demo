
const plugIns = import.meta.glob("./*.ts");
console.log('plugIns',plugIns)
// 引入plugIns下的所有文件
Object.keys(plugIns).forEach((key) => {
    if (key !== "./index.ts") {
        plugIns[key]();
    }
})
