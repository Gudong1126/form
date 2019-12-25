<template>
    <div>
        <el-tabs v-model="activeName">
            <template v-for="(item, index) in list">
                <el-tab-pane :key="index" :label="item.title" :name="item.title">
                    <made-form v-if="isMade" ref="form" :data="item"></made-form>
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
                this.dataCopy = deepCopy(this.data)
                this.list = deepCopy(this.data.options.tabs)
            },
            deep: true
        },
        list: {
            handler (val) {
                this.dataCopy.options.tabs = val
                this.$emit('configJsonData', this.dataCopy)
            },
            deep: true
        }
    },
    mounted () {
        // console.log(this.data)
        // console.log('Tabs' + JSON.stringify(this.data, null, 4))
    },
    methods: {
        async getData () {
            // console.log(this.$refs.form)
            const formList = this.$refs.form
            // console.log(formList)
            let data = {}

            for (const item of formList) {
                // console.log(item.handelGetFormData)
                const itemData = await item.handelGetFormData()
                // console.log(itemData)
                data = { ...data, ...itemData }
            }
            console.log(data)
            return data
            // return this.$refs.form.handelGetFormData()
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
