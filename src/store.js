export default {
    install (Vue) {
        const EVENTBUS = new Vue({
            data () {
                return {
                    selectedItem: {} // 当前选中的元素
                }
            },
            methods: {
                get (key) {
                    return this[key]
                },
                set (key, val) {
                    this[key] = val
                }
            }
        })
        Vue.prototype.$events = EVENTBUS
        // Vue.$events = EVENTBUS
    }
}
