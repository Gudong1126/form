<template>
    <el-input type="textarea"
        v-model="value"
        :placeholder="data.options.placeholder"
        :disabled="data.options.disabled"
        :style="{ width: data.options.width }">
    </el-input>
</template>

<script>
export default {
    name: 'iTextarea',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            defaultValue: ''
        }
    },
    mounted () {
        this.defaultValue = this.data.options.defaultValue
    },
    computed: {
        value: {
            get () {
                return this.defaultValue
            },
            set (val) {
                this.defaultValue = val
                const { model } = this.data

                this.$emit('change', model, val)
            }
        }
    }
}
</script>
