<template>
    <div>
        <el-form ref="form"
            :model="formData"
            :label-width="data.config.labelWidth + 'px'"
            :label-position="data.config.labelPosition"
            :size="data.config.size"
        >
            <template v-for="item in data.list">
                <render-item v-if="item && item.key"
                    ref="renderItem"
                    :data="item"
                    :key="item.key"
                    @change="onChange">
                </render-item>
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
        mergeDefaultValue () {
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
                    this.formData[list[i].model] = list[i].options.defaultValue
                }
            }
            // console.log(this.formData)
            console.log(JSON.stringify(this.data, null, 4))
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
                    } else {
                        reject(new Error('表单数据校验失败').message)
                    }
                })
            })
        },
        onChange (key, val) {
            this.formData[key] = val
            // this.$emit('change', key, val)
        }
    }
}
</script>
