export default {
    install (Vue) {
        const EVENTBUS = new Vue({
            data () {
                return {
                    formConfig: {},
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
                updateFormItem (val) {
                    let list = this.formConfig.list
                    // this.findAndUpdate(list, val)
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
                        // return list
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
                    // for (let i = 0; i < list.length; i++) {
                    //     const item = list[i]
                    //     if (item.type === 'Tabs') {
                    //         let tabs = item.options.tabs
                    //         for (let j = 0; j < tabs.length; j++) {
                    //             tabs[j].list = this.findAndUpdate(tabs[j].list, val)
                    //         }
                    //     } else if (item.type === 'Subform') {
                    //         item.list = this.findAndUpdate(item.list, val)
                    //     } else {
                    //         if (item.key === val.key) {
                    //             list[i] = val
                    //         }
                    //     }
                    // }
                    return list
                }
            }
        })
        Vue.prototype.$events = EVENTBUS
        // Vue.$events = EVENTBUS
    }
}
