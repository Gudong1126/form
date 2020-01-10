<template>
    <div class="item-config">
        <el-form label-position="top" size="mini">
            <el-form-item label="字段标识" v-if="data.model">
                <el-input v-model="data.model"></el-input>
            </el-form-item>
            <el-form-item label="标题" v-if="data.name">
                <el-input v-model="data.name"></el-input>
            </el-form-item>
            <el-form-item label="placeholder" v-if="data.options && data.options.placeholder !== undefined">
                <el-input v-model="data.options.placeholder"></el-input>
            </el-form-item>
            <el-form-item label="默认值" v-if="data.type !== 'Radio' && data.type !== 'Checkbox' && data.options && data.options.defaultValue !== undefined">
                <el-input v-model="data.options.defaultValue"></el-input>
            </el-form-item>

            <el-form-item label="标签页" v-if="data.options && data.options.tabs !== undefined">
                <draggable tag="ul" v-model="data.options.tabs" handle=".handle">
                    <template v-for="(item, index) in data.options.tabs">
                        <li :key="index">
                            <el-input class="drag-input tabs" v-model="item.title" placeholder="label"></el-input>
                            <el-button-group class="drag-btn-group">
                                <el-button class="handle" circle plain type="primary" icon="el-icon-thumb"></el-button>
                                <el-button circle plain type="danger" icon="el-icon-delete" @click="handleDelTabs(index)"></el-button>
                            </el-button-group>
                        </li>
                    </template>
                </draggable>
                <el-button type="text" @click="handleAddTabs">添加页签</el-button>
            </el-form-item>

            <el-form-item label="选项" v-if="data.options && data.options.options !== undefined">
                <draggable tag="ul" v-model="data.options.options" handle=".handle">
                    <el-radio-group v-if="data.type === 'Radio'" v-model="data.options.defaultValue">
                        <template v-for="(item, index) in data.options.options">
                            <li :key="index">
                                <el-radio :label="item.value">
                                    <el-input class="drag-input" v-model="item.label" placeholder="label"></el-input>
                                    <el-input class="drag-input" v-model="item.value" @change="handelOptionsVlaueChange($event, item)" placeholder="value"></el-input>
                                    <el-button-group class="drag-btn-group">
                                        <el-button class="handle" circle plain type="primary" icon="el-icon-thumb"></el-button>
                                        <el-button circle plain type="danger" icon="el-icon-delete" @click="handleOptionsDel(index)"></el-button>
                                    </el-button-group>
                                </el-radio>
                            </li>
                        </template>
                    </el-radio-group>
                    <el-checkbox-group v-else v-model="data.options.defaultValue">
                        <template v-for="(item, index) in data.options.options">
                            <li :key="index">
                                <el-checkbox :label="item.value">
                                    <el-input class="drag-input" v-model="item.label" placeholder="label"></el-input>
                                    <el-input class="drag-input" v-model="item.value" @change="handelOptionsVlaueChange($event, item)" placeholder="value"></el-input>
                                    <el-button-group class="drag-btn-group">
                                        <el-button class="handle" circle plain type="primary" icon="el-icon-thumb"></el-button>
                                        <el-button circle plain type="danger" icon="el-icon-delete" @click="handleOptionsDel(index)"></el-button>
                                    </el-button-group>
                                </el-checkbox>
                            </li>
                        </template>
                    </el-checkbox-group>
                </draggable>
                <el-button type="text" @click="handleAddOptions">添加选项</el-button>
            </el-form-item>

            <el-form-item label="宽度" v-if="data.options && data.options.width !== undefined">
                <el-input v-model="data.options.width"></el-input>
            </el-form-item>
            <el-form-item label="操作" v-if="data.options">
                <el-checkbox v-if="data.options.disabled !== undefined" v-model="data.options.disabled">禁用</el-checkbox>
                <el-checkbox v-if="data.options.display !== undefined"
                    v-model="data.options.display.ops"
                    @change="handleDisplayOpsChange">隐藏
                </el-checkbox>
                <div class="display-options" v-if="data.options.display && data.options.display.ops">
                    <div class="flx">
                        <div class="label">关联</div>
                        <el-select class="select" v-model="data.options.display.key" placeholder="请选择">
                            <el-option v-for="item in displayOptions"
                                :key="item.key"
                                :label="item.name"
                                :value="item.key"
                                :disabled="item.key === data.key || item.type === 'Tabs' || item.type === 'Subform'">
                            </el-option>
                        </el-select>
                    </div>
                    <render-item class="render-item"
                        v-if="displaySelectData"
                        :data="displaySelectData"
                        inSubform
                        @change="_onChange">
                    </render-item>
                </div>

            </el-form-item>
            <el-form-item label="效验" v-if="data.options && data.options.required !== undefined">
                <el-checkbox v-model="data.options.required">必填</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import { deepCopy } from '../utils/assist'
import RenderItem from '../components/RenderItem'

export default {
    name: 'ItemConfig',
    components: { draggable, RenderItem },
    data () {
        return {
            validator: {
                type: null,
                required: null,
                pattern: null
            },
            optionsKey: 0,
            tabsKey: 0,
            displayOptions: [] // 隐藏关联设置选项
        }
    },
    watch: {
        'data.options.required' (val) {
            this.generateRules(val)
        },
        'data.options.display' (val) { // selectedItem 变化时就去计算 displayOptions 方便已设置显示隐藏元素的回填
            if (val && val.ops) {
                const list = deepCopy(this.formConfig.list)
                this._findSelectInLevel(list)
            }
        }
    },
    computed: {
        data () {
            return this.$events.get('selectedItem')
        },
        formConfig () {
            return this.$events.get('formConfig')
        },
        displaySelectData () { // 计算隐藏关联元素
            let isFind = this.displayOptions.find(d => d.key === this.data.options.display.key)
            if (isFind) {
                isFind.options.defaultValue = this.data.options.display.value
            }
            return isFind
        }
    },
    methods: {
        generateRules (val) { // 生成 rule
            this.data.rules = []
            this.validator.required = val
                ? { required: true, message: `${this.data.name}必须填写！` }
                : null

            Object.keys(this.validator).forEach(key => {
                if (this.validator[key]) {
                    this.data.rules.push(this.validator[key])
                }
            })
        },

        handleAddOptions () {
            this.data.options.options.push({
                label: `新选项${this.optionsKey}`,
                value: `新选项${this.optionsKey}`
            })
            this.optionsKey++
        },

        // 检测选项设置是否有重复的 value
        handelOptionsVlaueChange (val, item) {
            const { options, defaultValue } = this.data.options
            let find = 0
            for (const op of options) {
                if (op.value === val) {
                    find++
                }
            }
            if (find > 1) {
                this.$alert('存在相同到value，请重新填写', '提示')
                item.value = ''
            }
            // 修改 value 清空之前设置的默认值
            this.data.options.defaultValue = typeof defaultValue === 'string' ? '' : []
        },

        handleOptionsDel (index) {
            if (this.data.options.options.length === 1) return
            this.data.options.options.splice(index, 1)
        },

        handleAddTabs () {
            this.data.options.tabs.push({
                title: `新页签${this.tabsKey}`,
                key: `tabs${this.tabsKey}`,
                list: []
            })
            this.tabsKey++
        },

        handleDelTabs (index) {
            if (this.data.options.tabs.length === 1) return
            this.data.options.tabs.splice(index, 1)
        },

        // 当隐藏设置为true时，计算 displayOptions
        handleDisplayOpsChange (val) {
            if (val) {
                const list = deepCopy(this.formConfig.list)
                this._findSelectInLevel(list)
            }
        },

        // 找出当前 selectedItem 所在的层级
        _findSelectInLevel (list) {
            for (const item of list) {
                const { type, options } = item

                if (type === 'Tabs') {
                    for (const c of options.tabs) {
                        this._findSelectInLevel(c.list)
                    }
                }

                if (item.key === this.data.key) {
                    this.displayOptions = list
                    break
                }
            }
        },

        // 隐藏关联元素值设置
        _onChange (key, val) {
            this.data.options.display.value = val
        }
    }
}
</script>

<style lang="less" scoped>
.item-config {
    padding: 0 10px;
}
.drag-input {
    margin: 2px 2px 2px 0;
    width: 33%;
    vertical-align: middle;
}
.drag-btn-group {
    vertical-align: middle;
}
.tabs {
    width: 75%;
}

.display-options {
    padding: 5px;
    border: 1px dashed #409EFF;
    .flx {
        display: flex;
        .label {
            flex: 0 0 35px;
            color: #606266;
        }
        .select {
            width: 100%;
        }
    }
    .render-item {
        margin-top: 10px;
    }
}

</style>
