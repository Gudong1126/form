<template>
    <div>
        <el-form label-width="80px" :model="formData" ref="form">
            <template v-for="item in data.list">
                <render-item :data="item" v-if="item && item.key" :key="item.key"></render-item>
            </template>
        </el-form>
        <el-button @click="handelGetFormData">获取数据</el-button>
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
    mounted () {

    },
    methods: {
        handelGetFormData () {
            this.$refs.form.validate((valid) => {
                console.log(this.formData)
                if (valid) {
                    console.log('submit')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
