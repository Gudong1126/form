<template>
    <div class="about">
        <el-tabs v-model="activeName1">
            <el-tab-pane label="用户管理" name="first">
                <el-input v-model="b"></el-input>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
                <el-input v-model="c"></el-input>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeName1: 'second',
            b: '',
            c: ''
        }
    }
}
</script>
