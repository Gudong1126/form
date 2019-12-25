<template>
    <div class="subform">
        <table class="table table-striped">
            <thead class="thead-dark">
                <draggable class="form-area" v-model="data.list"
                    :options="{
                        group: 'people',
                        //handle: '.drag-widget',
                        'ghost-class': 'ghost',
                        animation: '200',
                    }"
                    tag='tr'
                    @add="handleWidgetAdd">
                    <template v-for="(header) in data.list">
                        <th v-if="header && header.key" :key="header.key" scope="col">
                            {{ header.name }}
                        </th>
                    </template>
                </draggable>
            </thead>
            <tbody>
                <tr>
                    <template v-for="(item) in data.list">
                        <td :class="{ 'form-item': true, active: selectFormItem.key === item.key }"
                            v-if="item && item.key"
                            :key="item.key"
                            @click.native.stop="handleClickFormItem(item)">
                            <render-item :data="item" :inSubform="true"></render-item>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import RenderItem from './RenderItem'
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
        }
    },
    data () {
        return {
            selectFormItem: {}
        }
    },
    methods: {
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
}

</style>
