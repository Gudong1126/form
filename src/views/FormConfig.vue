<template>
    <div class="form-config">
        <el-form label-position="top" size="mini">
            <el-form-item label="对齐方式">
                <el-radio-group v-model="data.labelPosition">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标签宽度">
                <el-input-number v-model="data.labelWidth" :min="50" :max="200" :step="10"></el-input-number>
            </el-form-item>
            <el-form-item label="组件尺寸">
                <el-radio-group v-model="data.size">
                    <el-radio-button label="mini">mini</el-radio-button>
                    <el-radio-button label="small">small</el-radio-button>
                    <el-radio-button label="medium">medium</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'FormConfig',
    data () {
        return {
        }
    },
    computed: {
        data () {
            const formConfig = this.$events.get('formConfig')
            return formConfig.config
        }
    }
}
</script>

<style lang="less" scoped>
.form-config {
    padding: 0 10px;
}
</style>
