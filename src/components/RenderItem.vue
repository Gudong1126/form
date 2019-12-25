<template>
    <div class="container">
        <el-form-item v-if="data.type !== 'Tabs'" :label="data.name">
            <div class="form-item"></div>
        </el-form-item>
        <div v-else class="layouts-item"></div>
    </div>
</template>

<script>
import Vue from 'vue'
import { findComponentUpward } from '../utils/assist'

export default {
    name: 'RenderItem',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            isMade: findComponentUpward(this, 'MadeForm'),
            instance: null
        }
    },
    mounted () {
        // console.log(this.data)
        // console.log('renderItem' + JSON.stringify(this.data, null, 4))
        const { type } = this.data
        // console.log(findComponentUpward(this, 'MadeForm'))
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
                instance.$on('change', this.onChange)
                instance.$on('configJsonData', this.configJsonData)

                // 挂载到 ID 为 plateContainer 的DOM元素
                if (templateName === 'Tabs') {
                    instance.isMade = Boolean(this.isMade)
                    instance.$mount(this.$el.querySelector('.layouts-item'))
                } else {
                    instance.$mount(this.$el.querySelector('.form-item'))
                }
                this.instance = instance
                // instance.$mount(this.$el)
                // console.log(this)
                // console.log(templateName + ' 加载成功')
            })
        },
        onChange (key, val) {
            this.$emit('change', key, val)
        },
        configJsonData (val) {
            this.$emit('configJsonData', val)
        },
        async getData () {
            const childrenFormData = this.instance.getData

            if (typeof childrenFormData === 'function') {
                const formData = await childrenFormData()
                return formData
            } else {
                return false
            }
        }
    }
}
</script>
