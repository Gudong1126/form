<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="用户管理" name="first">
                <make-form :data="data"></make-form>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import MakeForm from '../views/MakeForm'

export default {
    name: 'iTabs',
    components: {
        MakeForm
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            selectFormItem: {},
            activeName: 'first'
        }
    },
    mounted () {
        // console.log(this.data)
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.i-form {
    padding: 5px;
    width: 100%;
    background-color: #fff;
    position: relative;
    // padding: 2px;
    .form-area, .form-list {
        min-height: 500px;
    }
    .empty {
        position: absolute;
        text-align: center;
        font-size: 20px;
        left: 0;
        right: 0;
        top: 150px;
        color: #ccc;
    }
}

.form-item {
    position: relative;
    margin: 5px 0;
    padding: 5px;
    border: 1px dashed rgba(170,170,170,0.7);
}
.active {
    border: 2px solid #409EFF;
}

.form-item-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 28px;
    line-height: 28px;
    background: rgba(64, 158, 255, 0.59);
    z-index: 9;
    i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
    }
}
</style>
