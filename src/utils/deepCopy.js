// 定义检测数据类型的功能函数
function checkedType (target) {
    return Object.prototype.toString.call(target).slice(8, -1)
}

// 实现深度克隆---对象/数组
function deepCopy (target) {
    // 判断拷贝的数据类型
    let result = null
    let targetType = checkedType(target)
    if (targetType === 'Object') {
        result = {}
    } else if (targetType === 'Array') {
        result = []
    } else {
        return target
    }
    // 遍历目标数据
    for (let i in target) {
        let value = target[i]
        // 判断目标结构里的每一值是否存在对象/数组
        if (checkedType(value) === 'Object' || checkedType(value) === 'Array') {
            result[i] = deepCopy(value)
        } else {
            result[i] = value
        }
    }
    return result
}

export default deepCopy
