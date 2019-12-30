<template>
    <div class="subform">
        <template v-if="!isMade">
            <draggable class="drag-area" v-model="data.list"
                group="drag"
                ghost-class="subform-ghost"
                animation="200"
                @add="handleWidgetAdd"
            >
                <template v-for="(item, index) in data.list">
                    <div :class="{ 'item': true, active: selectedItem.key === item.key }"
                        v-if="item && item.key" :key="item.key"
                        @click.stop="handleClickFormItem(item)"
                    >
                        <div class="header">{{ item.name }}</div>
                        <div class="content">
                            <render-item :data="item" :inSubform="true"></render-item>
                        </div>

                        <div class="item-handle" v-if="selectedItem.key === item.key">
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
            value: [],
            obj: {}
        }
    },
    computed: {
        selectedItem () {
            return this.$events.get('selectedItem')
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

            this.setSelectedItem(this.data.list[newIndex])
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
            this.setSelectedItem(item)
        },
        setSelectedItem (val) {
            this.$events.set('selectedItem', val)
        }
    }
}
</script>

<style lang="less" scoped>

.subform {
    background-color: #eee;
    .drag-area {
        display: flex;
        min-height: 110px;
        overflow-x: scroll;
    }
    .item {
        position: relative;
        flex: 0 0 180px;
        background-color: #fff;
        border: 1px solid #ddd;
        text-align: center;
        .header {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #ddd;
            color: #909399;
        }
        .content {
            padding: 12px 10px;
        }
    }
}

</style>
