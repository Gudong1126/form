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
            <el-form-item label="操作" v-if="data.options && data.options.disabled !== undefined">
                <el-checkbox v-model="data.options.disabled">禁用</el-checkbox>
            </el-form-item>
            <el-form-item label="效验" v-if="data.options && data.options.required !== undefined">
                <el-checkbox v-model="data.options.required">必填</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'ItemConfig',
    components: { draggable },
    data () {
        return {
            validator: {
                type: null,
                required: null,
                pattern: null
            },
            optionsKey: 0,
            tabsKey: 0
        }
    },
    watch: {
        'data.options.required' (val) {
            this.generateRules(val)
        }
    },
    computed: {
        data () {
            return this.$events.get('selectedItem')
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
        handleAddOptions () { // 添加新选项
            this.data.options.options.push({
                label: `新选项${this.optionsKey}`,
                value: `新选项${this.optionsKey}`
            })
            this.optionsKey++
        },
        handelOptionsVlaueChange (val, item) { // 检测选项设置是否有重复的 value
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
        handleOptionsDel (index) { // 选项删除
            if (this.data.options.options.length === 1) return
            this.data.options.options.splice(index, 1)
        },
        handleAddTabs () { // 添加新页签
            this.data.options.tabs.push({
                title: `新页签${this.tabsKey}`,
                key: `tabs${this.tabsKey}`,
                list: []
            })
            this.tabsKey++
        },
        handleDelTabs (index) { // 页签删除
            if (this.data.options.tabs.length === 1) return
            this.data.options.tabs.splice(index, 1)
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
</style>
