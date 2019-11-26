<template>
    <div>
        <el-input placeholder="文本框"></el-input>
    </div>
    <!-- <el-form-item label="单行文本"> -->
    <!-- </el-form-item> -->
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
    mounted () {
        // console.log(this.data)
    }
}
</script>
