<template>
    <div class="home">
        <el-header class="header">
            <div class="btn-group">
                <el-button type="text" @click="handlePreview">预览</el-button>
                <el-button type="text" @click="handlePreviewJson">查看JSON</el-button>
            </div>
        </el-header>

        <el-container class="container">
            <el-aside class="area-components" width="250px">
                <div v-for="(item, index) in components" :key="index">
                    <div class="c-title">{{ item.title }}</div>
                    <div class="c-list">
                        <draggable :list="item.list"
                            :group="{ name: 'drag', pull: 'clone', put: false }"
                            :sort="false"
                            ghost-class='ghost'
                        >
                            <el-card class="c-item" v-for="(cItem, index) in item.list" :key="index" shadow="hover" :body-style="CardBodyStyle">
                                <i :class="cItem.icon"></i>{{cItem.name}}
                            </el-card>
                        </draggable>
                    </div>
                </div>
            </el-aside>

            <el-container class="area-container">
                <make-form ref="makeForm" :data="form"></make-form>
            </el-container>

            <el-aside class="area-config" width="250px">
                <el-tabs class="nav" v-model="activeName">
                    <el-tab-pane label="字段属性" name="first">
                        <item-config></item-config>
                    </el-tab-pane>
                    <el-tab-pane label="表单属性" name="second">
                        <form-config></form-config>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
        </el-container>

        <el-dialog title="预览" :visible.sync="dialogVisible">
            <div v-if="dialogVisible">
                <made-form ref="form" :data="formConfig"></made-form>
            </div>
            <span slot="footer">
                <el-button type="primary" @click="getData">获取数据</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="JSON" :visible.sync="dialogConfigJsonVisible">
            <div v-if="dialogConfigJsonVisible" id="jsoneditor" style="width: 100%; height: 400px;"></div>
            <span slot="footer">
                <el-button type="primary" @click="dialogConfigJsonVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import MakeForm from './MakeForm'
import MadeForm from './MadeForm'
import FormConfig from './FormConfig'
import ItemConfig from './ItemConfig'
import JSONEditor from 'jsoneditor'
import { components } from '../config/components'

export default {
    name: 'home',
    components: {
        draggable,
        MakeForm,
        MadeForm,
        FormConfig,
        ItemConfig
    },
    data () {
        return {
            components,
            CardBodyStyle: {
                padding: '8px 5px'
            },
            form: this.$events.get('formConfig'),
            dialogVisible: false,
            dialogConfigJsonVisible: false,
            formConfig: {},
            activeName: 'first',
            jsonData: {}
        }
    },
    methods: {
        handlePreview () {
            this.formConfig = this.$events.get('formConfig')
            this.dialogVisible = true
        },
        handlePreviewJson () {
            this.jsonData = this.$events.get('formConfig')
            this.previewJson()
        },
        previewJson () {
            this.dialogConfigJsonVisible = true

            this.$nextTick(() => {
                let container = document.querySelector('#jsoneditor')
                let options = {
                    mode: 'code',
                    mainMenuBar: false
                }
                let editor = new JSONEditor(container, options)

                editor.set(this.jsonData)
            })
        },
        async getData () {
            const data = await this.$refs.form.handelGetFormData()
            console.log(data)
            this.jsonData = data
            this.previewJson()
        }
    }
}
</script>

<style lang="less" scoped>

.area-config {
    .nav /deep/ .el-tabs__nav {
        width: 100%;
        .el-tabs__item {
            width: 50%;
            padding: 0;
            text-align: center;
        }
    }
}

.home {
    height: calc(100% - 60px);
    .header {
        background-color: #f8f8f8;
        border-bottom: 1px solid #ddd;
        .btn-group {
            float: right;
            line-height: 60px;
        }
    }
    .container {
        height: 100%;
        .area-components {
            padding: 10px;
            .c-title {
                padding: 5px 8px;
                font-size: 13px;
            }
            .c-list {
                padding-bottom: 10px;
                &:after{
                    clear: both;
                    display: block;
                    content: " ";
                }
            }
            .c-item {
                float: left;
                width: 47%;
                margin: 1%;
                cursor: move;
                background: #F4F6FC;
                font-size: 12px;
                i {
                    text-indent: .5em;
                    padding-right: 5px;
                }
                &:hover {
                    border: 1px dashed #409EFF;
                    color: #409EFF;
                }
            }
        }

        .area-container {
            padding: 5px 10px;
            background-color: #eee;
        }
    }

}

</style>
