<template>
    <div class="about">
        <h1>This is an about page</h1>
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="first">
                <el-input v-model="a"></el-input>

                <div class="test"></div>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Vue from 'vue'
// import test from './test'
export default {
    // components: { test },
    data () {
        return {
            activeName: 'first',
            activeName1: 'second',
            a: '',
            b: '',
            c: ''
        }
    },
    mounted () {
        this.registerComponent('test')
    },
    methods: {
        registerComponent (templateName) {
            return import(`./${templateName}.vue`).then(component => {
                const constructor = Vue.extend(component.default)
                const instance = new constructor()

                // 挂载到 ID 为 plateContainer 的DOM元素
                instance.$mount(this.$el.querySelector('.test'))
                this.instance = instance
            })
        }
    }
}
</script>
