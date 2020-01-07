<template>
    <div>
        <el-tabs v-model="activeName">
            <template v-for="item in tabs">
                <el-tab-pane :key="item.key" :label="item.title" :name="item.key">
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
            activeName: 'tabs1',
            dataCopy: {},
            tabs: []
        }
    },
    watch: {
        data: {
            handler (val) {
                // 将 tabs data 复制，否则可能会出现循环引用
                const tabs = deepCopy(this.data.options.tabs)
                let formConfig = this.$events.get('formConfig')

                this.dataCopy = deepCopy(this.data)
                this.tabs = tabs.map(item => {
                    return {
                        ...item,
                        config: formConfig.config
                    }
                })
            },
            deep: true
        },
        tabs: {
            handler (val) {
                // 监听 tabs 的变化，这里本质也是修改了某个元素
                this.dataCopy.options.tabs = val
                this.$events.updateFormItem(this.dataCopy)
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
