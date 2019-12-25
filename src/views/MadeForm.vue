<template>
    <div>
        <el-form label-width="80px" :model="formData" ref="form">
            <template v-for="item in data.list">
                <render-item
                    v-if="item && item.key"
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
            formData: {}
        }
    },
    created () {
        this.initFormData()
    },
    methods: {
        initFormData () {
            const { list } = this.data
            const layoutEl = ['Tabs']
            // console.log(list)
            for (let i = 0; i < list.length; i++) {
                if (!layoutEl.includes(list[i].type)) {
                    this.formData[list[i].model] = list[i].options.defaultValue
                }
            }
            // console.log(this.formData)
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
