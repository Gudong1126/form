<template>
    <div>
        <el-tabs v-model="activeName">
            <template v-for="(item, index) in list">
                <el-tab-pane :key="index" :label="item.title" :name="item.title">
                    <template v-if="isMade">
                        <made-form v-if="item.list.length > 0" ref="form" :data="item"></made-form>
                    </template>
                    <make-form v-else :data="item"></make-form>
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>

<script>
import MakeForm from '../views/MakeForm'
import MadeForm from '../views/MadeForm'
import deepCopy from '../utils/deepCopy'

export default {
    name: 'iTabs',
    components: {
        MakeForm,
        MadeForm
    },
    props: {
        data: {
            type: Object,
            default: null
        },
        isMade: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            selectFormItem: {},
            activeName: 'tabs1',
            dataCopy: {},
            list: []
        }
    },
    watch: {
        data: {
            handler (val) {
                // 将list复制，否则可能会出现循环引用
                this.dataCopy = deepCopy(this.data)
                this.list = deepCopy(this.data.options.tabs)
            },
            deep: true
        },
        list: {
            handler (val) {
                // 监听list的变化，并将 data 的副本向上传播
                this.dataCopy.options.tabs = val

                this.$events.updateFormItem(this.dataCopy)
                // 这里本质也是修改了某个元素
            },
            deep: true
        }
    },
    methods: {
        async getData () { // 获取 tabs 中所有 form 表单中的数据
            const formList = this.$refs.form
            let data = {}

            for (const item of formList) {
                const itemData = await item.handelGetFormData()
                data = { ...data, ...itemData }
            }
            return data
        }
    }
}
</script>

<style lang="less" scoped>

</style>
