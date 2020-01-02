<template>
    <div class="container">
        <el-form-item v-if="!inSubform && data.type !== 'Tabs'"
            :label="data.name"
            :required="data.options.required"
            :prop="data.model">
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
        },
        inSubform: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            isMade: findComponentUpward(this, 'MadeForm'),
            instance: null
            // isSubform: findComponentUpward(this, 'Subform')
        }
    },
    mounted () {
        // console.log(this)
        // console.log('renderItem' + JSON.stringify(this.data, null, 4))
        const { type } = this.data
        this.registerComponent(type)
    },
    methods: {
        registerComponent (templateName) {
            return import(`../components/${templateName}.vue`).then(component => {
                const constructor = Vue.extend(component.default)
                const instance = new constructor()

                // 传入数据 dataObj 为 props
                instance.data = this.data
                instance.isMade = Boolean(this.isMade) // 是否在 生成 中

                // 监听事件
                instance.$on('change', this.onChange)

                // 挂载到 DOM元素 并且手动绑定 $parent
                if (this.inSubform || templateName === 'Tabs') {
                    instance.$parent = this
                    instance.$mount(this.$el.querySelector('.layouts-item'))
                } else {
                    instance.$parent = this.$children[0]
                    instance.$mount(this.$el.querySelector('.form-item'))
                }
                this.instance = instance

                // instance.$mount(this.$el)
                // console.log(templateName + ' 加载成功')
            })
        },
        onChange (key, val) {
            this.$emit('change', key, val)
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
