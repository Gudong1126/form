<template>
    <div class="subform">
        <template v-if="!isMade">
            <draggable class="test-form-area" v-model="data.list"
                group="drag"
                ghost-class="ghost1"
                animation="200"
                @add="handleWidgetAdd"
            >
                <template v-for="(item, index) in data.list">
                    <div class="test-form-item"
                        :class="{ active: selectFormItem.key === item.key }"
                        v-if="item && item.key" :key="item.key"
                        @click="handleClickFormItem(item)">
                        <div class="test-header">{{ item.name }}</div>
                        <div class="test-cont">
                            <render-item :data="item" :inSubform="true"></render-item>
                        </div>

                        <div class="form-item-handle" v-if="selectFormItem.key === item.key">
                            <i class="el-icon-delete" @click.stop="handleDeleteFormItem(index)"></i>
                        </div>
                    </div>
                </template>
            </draggable>
        </template>

        <template v-else>
            <el-table :data="value">
                <template v-for="item in data.list">
                    <el-table-column v-if="item && item.key" :key="item.key" :label="item.name" align="center">
                        <template slot-scope="scope">
                            <render-item :data="mergeDefaultValue(item, scope.row)" :inSubform="true" @change="onChange(...arguments, scope.row)"></render-item>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
        </template>
        <!-- <button @click="add">添加</button> -->
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import RenderItem from './RenderItem'
import { deepCopy } from '../utils/assist'
export default {
    name: 'Subform',
    components: {
        draggable,
        RenderItem
    },
    props: {
        data: {
            type: Object,
            default: null
        },
        isMade: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            selectFormItem: {},
            value: [],
            obj: {}
        }
    },
    mounted () {
        this.initSubform()
    },
    methods: {
        mergeDefaultValue (item, col) {
            let test = deepCopy(item)
            const { model } = test
            test.options.defaultValue = col[model]
            return test
        },
        initSubform () {
            const { list, options } = this.data
            let defaultValue = options.defaultValue || []

            for (const item of list) {
                this.obj[item.model] = item.options.defaultValue
            }

            if (defaultValue.length > 0) {
                this.value = [ ...defaultValue ]
            } else {
                const objTest = deepCopy(this.obj)
                this.value.push(objTest)
            }
        },
        add () {
            const objTest = deepCopy(this.obj)
            console.log(objTest)
            this.value.push(objTest)
            console.log(this.value)
            console.log(this.data)
        },
        onChange (key, val, row) {
            row[key] = val
            this.$emit('change', this.data.model, this.value)
        },
        handleWidgetAdd (e) {
            const newIndex = e.newIndex
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)

            this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex],
                options: {
                    ...this.data.list[newIndex].options,
                    remoteFunc: 'func_' + key
                },
                key,
                model: this.data.list[newIndex].type + '_' + key,
                rules: []
            })

            this.selectFormItem = this.data.list[newIndex]
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
            this.selectFormItem = item
        }
    }
}
</script>

<style lang="less" scoped>

.test-form-area {
    display: flex;
    min-height: 110px;
    // width: 100%;
    // height: 110px;
    overflow-x: scroll;
}
.test-form-item {
    position: relative;
    flex: 0 0 180px;
    // width: 180px;
    // height: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    text-align: center;
    .test-header {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        color: #909399;
    }
    .test-cont {
        padding: 12px 10px;
    }
}

// --------
.subform {
    // min-height: 110px;
    // height: 110px;
    background-color: #eee;
}
.form-area {
    height: 50px;
}
// .form-area, .form-list {
//     width: 100%;
//     min-height: 100px;
// }
.form-item {
    width: 200px;
}
.table {
    height: 100%;
    width: 100%;
}

.th {
    width: 50px;
}

// .ghost {
//     background: #F56C6C;
//     border: 2px solid #F56C6C;
//     outline-width: 0;
//     height: 3px;
//     box-sizing: border-box;
//     font-size: 0;
//     content: '';
//     overflow: hidden;
//     padding: 0;
// }
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
