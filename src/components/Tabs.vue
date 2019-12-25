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
                this.$emit('configJsonData', this.dataCopy)
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
.i-form {
    padding: 5px;
    width: 100%;
    background-color: #fff;
    position: relative;
    // padding: 2px;
    .form-area, .form-list {
        min-height: 500px;
    }
    .empty {
        position: absolute;
        text-align: center;
        font-size: 20px;
        left: 0;
        right: 0;
        top: 150px;
        color: #ccc;
    }
}

.form-item {
    position: relative;
    margin: 5px 0;
    padding: 5px;
    border: 1px dashed rgba(170,170,170,0.7);
}
.active {
    border: 2px solid #409EFF;
}

.form-item-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: rgba(64, 158, 255, 0.59);
    z-index: 9;
    i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
