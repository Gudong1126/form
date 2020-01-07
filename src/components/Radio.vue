<template>
    <el-radio-group v-model="value"
        :disabled="data.options.disabled">
        <el-radio v-for="(item, index) of data.options.options"
            :key="index"
            :label="item.value">
            {{ item.label }}
        </el-radio>
    </el-radio-group>
</template>

<script>
export default {
    name: 'iRadio',
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
