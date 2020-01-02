<template>
    <div class="item-config">
        <el-form label-position="top" size="mini">
            <el-form-item label="标题" v-if="data.name">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="效验" v-if="data.options && data.options.required !== undefined">
                <el-checkbox v-model="data.options.required">必填</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name: 'ItemConfig',
    data () {
        return {
            validator: {
                type: null,
                required: null,
                pattern: null
            }
            // data: this.$events.get('selectedItem')
        }
    },
    watch: {
        'data.options.required' (val) {
            this.generateRules(val)
        }
    },
    computed: {
        data () {
            return this.$events.get('selectedItem')
        }
    },
    methods: {
        generateRules (val) {
            this.data.rules = []
            this.validator.required = val
                ? { required: true, message: `${this.data.name}必须填写！` }
                : null

            Object.keys(this.validator).forEach(key => {
                if (this.validator[key]) {
                    this.data.rules.push(this.validator[key])
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.item-config {
    padding: 0 10px;
}
</style>
