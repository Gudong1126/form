<template>
    <el-input v-model="value"
        :placeholder="data.options.placeholder"
        :disabled="data.options.disabled"
        :style="{ width: data.options.width }">
    </el-input>
</template>

<script>
export default {
    name: 'iInput',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {

        }
    },
    computed: {
        value: {
            get () {
                return this.data.options.defaultValue
            },
            set (val) {
                this.data.options.defaultValue = val
                const { model } = this.data

                this.$emit('change', model, val)
            }
        }
    }
}
</script>
