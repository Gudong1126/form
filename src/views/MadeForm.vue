<template>
    <div>
        <el-form ref="form"
            :model="formData"
            :label-width="data.config.labelWidth + 'px'"
            :label-position="data.config.labelPosition"
            :size="data.config.size"
            :rules="rules">

            <template v-for="item in data.list">
                <template v-if="item && item.key">
                    <render-item v-if="checkDisplay(item)"
                        ref="renderItem"
                        :data="item"
                        :key="item.key"
                        @change="onChange">
                    </render-item>
                </template>
            </template>
        </el-form>
    </div>
</template>

<script>
import RenderItem from '../components/RenderItem'
export default {
    name: 'MadeForm',
    components: {
        RenderItem
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            formData: {},
            rules: {},
            value: {}
        }
    },
    created () {
        // this.initFormData()
        this.mergeDefaultValue()
    },
    methods: {
        mergeDefaultValue () { // TODO: 数据回填，目前只能回填一层
            const { value } = this
            let { list } = this.data

            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    const element = value[key]
                    let index = -1
                    let findFormItem = list.find((item, i) => {
                        if (item.model === key) {
                            index = i
                            return true
                        } else {
                            return false
                        }
                    })

                    if (findFormItem) {
                        findFormItem.options.defaultValue = element
                        list.splice(index, 1, findFormItem)
                        this.data.list = list
                    }
                }
            }
            this.initFormData()
        },

        initFormData () {
            const { list } = this.data
            const layoutEl = ['Tabs']

            for (let i = 0; i < list.length; i++) {
                if (!layoutEl.includes(list[i].type)) {
                    // TODO: 这里我觉的也可以做数据回填操作，可能比目前的方式更好些
                    this.$set(this.formData, list[i].model, list[i].options.defaultValue)
                }
                if (list[i].rules && list[i].rules.length > 0) {
                    this.rules[list[i].model] = list[i].rules.map(item => {
                        return item
                    })
                }
            }
            // console.log(this.formData)
            // console.log(this.rules)
            // console.log(JSON.stringify(this.data, null, 4))
        },

        handelGetFormData () {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        let data = { ...this.formData }
                        const renderItemList = this.$refs.renderItem

                        for (const item of renderItemList) {
                            const fetchData = await item.getData()
                            if (fetchData) {
                                data = { ...data, ...fetchData }
                            }
                        }
                        resolve(data)
                    }
                })
            })
        },

        onChange (key, val) {
            this.formData[key] = val
            // this.$emit('change', key, val)
        },

        // 检测元素设置的显示隐藏
        checkDisplay (val) {
            const { options } = val
            if (options.display) {
                if (options.display.ops === false) return true

                if (options.display.ops && options.display.key === '') {
                    return false
                } else {
                    const { key, value } = options.display
                    const find = this.data.list.find(d => d.key === key)

                    return this.formData[find.model] === value
                }
            }
            return true
        }
    }
}
</script>
