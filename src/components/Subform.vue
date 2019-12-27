<template>
    <div class="subform">
        <table class="table table-striped">
            <thead class="thead-dark">
                <draggable class="form-area" v-model="data.list"
                    group="drag"
                    ghost-class="ghost"
                    animation="200"
                    tag='tr'
                    @add="handleWidgetAdd"
                >
                    <template v-for="header in data.list">
                        <th class="th" scope="col" v-if="header && header.key" :key="header.key">
                            {{ header.name }}
                        </th>
                    </template>
                </draggable>
            </thead>
            <tbody>
                <tr v-for="(col, index) in value" :key="index">
                    <template v-for="(item) in data.list">
                        <td :class="{ 'form-item': true, active: selectFormItem.key === item.key }"
                            v-if="item && item.key"
                            :key="item.key + '' + index"
                            @click.native.stop="handleClickFormItem(item)">
                            <render-item :data="mergeDefaultValue(item, col)" :inSubform="true" @change="onChange(...arguments, col)"></render-item>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
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
        // console.log(this.data)
        // const { list } = this.data

        // for (const item of list) {
        //     this.obj[item.model] = item.options.defaultValue
        // }

        // const objTest = deepCopy(this.obj)
        // console.log(objTest)
        // this.value.push(objTest)
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
            // console.log(this.data)
            // console.log(this.obj)
            // console.log(key)
            // console.log(val)
            // console.log(row)
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

.subform {
    min-height: 100px;
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
    word-wrap: break-word;
    word-break: break-all;
}

.th {
    width: 50px;
}

</style>
