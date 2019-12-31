<template>
    <div class="item-config">
        <el-form label-position="top" size="mini">
            <el-form-item label="标题">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default {
    name: 'ItemConfig',
    data () {
        return {
            // data: this.$events.get('selectedItem')
        }
    },
    computed: {
        data () {
            return this.$events.get('selectedItem')
        }
    }
}
</script>

<style lang="less" scoped>
.item-config {
    padding: 0 10px;
}
</style>
