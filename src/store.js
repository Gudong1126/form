export default {
    install (Vue) {
        const EVENTBUS = new Vue({
            data () {
                return {
                    formConfig: {
                        list: [],
                        config: {
                            labelWidth: 100,
                            labelPosition: 'right',
                            size: 'small'
                        }
                    },
                    selectedItem: {} // 当前选中的元素
                }
            },
            methods: {
                get (key) {
                    return this[key]
                },
                set (key, val) {
                    this[key] = val
                },
                updateFormItem (val) { // 修改某个元素
                    let list = this.formConfig.list
                    this.formConfig.list = this.findAndUpdate(list, val)
                },
                findAndUpdate (list, val) {
                    let index = 0
                    let findThis = list.find((item, i) => {
                        if (item.key === val.key) {
                            index = i
                        }
                        return item.key === val.key
                    })

                    if (findThis) {
                        list[index] = val
                    } else {
                        for (let item of list) {
                            if (item.type === 'Tabs') {
                                let tabs = item.options.tabs
                                for (let j = 0; j < tabs.length; j++) {
                                    tabs[j].list = this.findAndUpdate(tabs[j].list, val)
                                }
                            }
                            if (item.type === 'Subform') {
                                item.list = this.findAndUpdate(item.list, val)
                            }
                        }
                    }
                    return list
                }
            }
        })
        Vue.prototype.$events = EVENTBUS
        // Vue.$events = EVENTBUS
    }
}
