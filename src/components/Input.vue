<template>
    <div>
        <el-input v-model="value" placeholder="文本框"></el-input>
    </div>
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
