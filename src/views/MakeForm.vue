<template>
    <div class="i-form">
        <div v-if="data.list.length === 0" class="empty">从左侧拖拽来添加字段</div>
        <el-form label-width="80px">
            <draggable class="form-area" v-model="data.list"
                :options="{
                    group: 'people',
                    //handle: '.drag-widget',
                    'ghost-class': 'ghost',
                    animation: '200'
                }"
                @add="handleWidgetAdd">
                <transition-group name="fade" tag="div" class="form-list">
                    <template v-for="(item, index) in data.list">
                        <!-- @click.native.stop="handleClickFormItem(item)"> -->
                        <div :class="{ 'form-item': true, active: selectFormItem.key === item.key }"
                            v-if="item && item.key"
                            :key="item.key"
                            @click="handleClickFormItem(item)">
                            <render-item :data="item" @configJsonData="configJsonData"></render-item>
                            <div class="form-item-handle" v-if="selectFormItem.key === item.key">
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
    data () {
        return {
            selectFormItem: {},
            dataCopy: this.data // 保存一份配置信息的副本，也是最后获取到的配置信息
        }
    },
    watch: {
        // selectFormItem: {
        //     handler (val) {
        //         this.$emit('update:select', val)
        //     },
        //     deep: true
        // }
        data: {
            handler (val) {
                // console.log('makeForm' + JSON.stringify(val, null, 4))
                this.$emit('configJsonChange', val)
            },
            deep: true
        }
    },
    mounted () {
        // console.log(this.data)
        // console.log('makeForm' + JSON.stringify(this.data, null, 4))
    },
    methods: {
        configJsonData (val) {
            const { key } = val
            const { list } = this.data

            this.dataCopy.list = list.map(item => {
                return item.key === key ? val : item
            })
        },
        handleWidgetAdd (e) {
            // console.log(e)
            // console.log(this.data)
            const newIndex = e.newIndex
            // console.log(newIndex)
            // 为添加的元素生成唯一的key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                options: {
                    ...this.data.list[newIndex].options,
                    remoteFunc: 'func_' + key
                },
                key,
                // 绑定键值
                model: this.data.list[newIndex].type + '_' + key,
                rules: []
            })

            this.selectFormItem = this.data.list[newIndex]
            // console.log(this.selectFormItem)
        },
        handleDeleteFormItem (index) {
            if (this.data.list[index + 1]) {
                this.selectFormItem = this.data.list[index + 1]
            } else {
                this.selectFormItem = this.data.list[index - 1] || {}
            }
            this.data.list.splice(index, 1)
        },
        handleClickFormItem (item) {
            // console.log(item)
            this.selectFormItem = item
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
