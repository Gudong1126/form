<template>
    <div class="i-form">
        <div v-if="data.list.length === 0" class="empty">从左侧拖拽来添加字段</div>
        <el-form
            :label-width="data.config.labelWidth + 'px'"
            :label-position="data.config.labelPosition"
            :size="data.config.size"
        >
            <draggable class="drag-area"
                v-model="data.list"
                group="drag"
                ghost-class="ghost"
                animation="200"
                @add="handleWidgetAdd"
            >
                <transition-group name="fade" tag="div" class="list">
                    <template v-for="(item, index) in data.list">
                        <div :class="{
                            'item': true,
                            'layouts': item.type === 'Tabs' || item.type === 'Subform',
                            active: selectedItem.key === item.key
                        }"
                            v-if="item && item.key"
                            :key="item.key"
                            @click.stop="handleClickFormItem(item)">

                            <render-item :data="item"></render-item>

                            <div class="item-handle" v-if="selectedItem.key === item.key">
                                <i class="el-icon-delete" @click.stop="handleDeleteFormItem(index)"></i>
                            </div>
                        </div>
                    </template>
                </transition-group>
            </draggable>
        </el-form>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import RenderItem from '../components/RenderItem'
// import deepCopy from '../utils/deepCopy'

export default {
    name: 'MakeForm',
    components: {
        draggable,
        RenderItem
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    computed: {
        selectedItem () {
            return this.$events.get('selectedItem')
        }
    },
    watch: {
        data: {
            handler (val) {
                // console.log('makeForm' + JSON.stringify(val, null, 4))
                // console.log('make form =', val)
            },
            deep: true
        }
    },
    mounted () {

    },
    methods: {
        handleWidgetAdd (e) {
            // console.log(e)
            // console.log(this.data)
            const newIndex = e.newIndex
            // console.log(newIndex)
            // 为添加的元素生成唯一的key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            let newEle = this.data.list[newIndex]
            if (newEle.type === 'Radio' || newEle.type === 'Checkbox') {
                this.$set(this.data.list, newIndex, {
                    ...newEle,
                    options: {
                        ...newEle.options,
                        remoteFunc: 'func_' + key,
                        options: [
                            {
                                value: '选项1',
                                label: '选项1'
                            },
                            {
                                value: '选项2',
                                label: '选项2'
                            }
                        ],
                        props: {
                            value: 'value',
                            label: 'label'
                        }
                    },
                    key,
                    // 绑定键值
                    model: newEle.type + '_' + key,
                    rules: []
                })
            } else {
                this.$set(this.data.list, newIndex, {
                    ...newEle,
                    options: {
                        ...newEle.options,
                        remoteFunc: 'func_' + key
                    },
                    key,
                    // 绑定键值
                    model: newEle.type + '_' + key,
                    rules: []
                })
            }

            this.setSelectedItem(this.data.list[newIndex])
            // console.log(this.selectFormItem)
        },
        handleDeleteFormItem (index) {
            if (this.data.list[index + 1]) {
                this.setSelectedItem(this.data.list[index + 1])
            } else {
                this.setSelectedItem(this.data.list[index - 1] || {})
            }
            this.data.list.splice(index, 1)
        },
        handleClickFormItem (item) {
            console.log(item)
            this.setSelectedItem(item)
        },
        setSelectedItem (val) {
            this.$events.set('selectedItem', val)
        }
    }
}
</script>

<style lang="less" scoped>
.i-form {
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    background-color: #fff;
    position: relative;
    .drag-area, .list {
        min-height: 500px;
    }

    .item {
        position: relative;
        margin: 5px 0;
        padding: 5px;
        // &::after {
        //     position: absolute;
        //     left: 0;
        //     right: 0;
        //     top: 0;
        //     bottom: 0;
        //     display: block;
        //     z-index: 8;
        //     content: '';
        // }
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

</style>
