<template>
    <div class="container">
        <el-form-item v-if="data.type !== 'tabs'"
            :label="data.name">
            <div class="form-item"></div>
        </el-form-item>
        <div class="layouts-item"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'RenderItem',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    mounted () {
        console.log(this.data)
        const { type } = this.data
        // console.log(this)
        this.registerComponent(type)
    },
    methods: {
        registerComponent (templateName) {
            return import(`../components/${templateName}.vue`).then(component => {
                const constructor = Vue.extend(component.default)
                const instance = new constructor()

                // 传入数据 dataObj 为 props
                instance.data = this.data

                // 监听抛出的数据  this.$emit("emitStream", {  data: "data" });
                // instance.$on("emitStream", params => {
                // //  params 为组件内部抛出的数据

                // })

                // 挂载到 ID 为 plateContainer 的DOM元素
                if (templateName === 'tabs') {
                    instance.$mount(this.$el.querySelector('.layouts-item'))
                } else {
                    instance.$mount(this.$el.querySelector('.form-item'))
                }
                // instance.$mount(this.$el)
                console.log(this)
                // console.log(templateName + " 加载成功");
            })
        }
    }
}
</script>
