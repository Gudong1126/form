<template>
    <div class="home">
        <el-header class="header">
            <el-button type="primary" @click="handlePreview">预览</el-button>
        </el-header>

        <el-container class="container">
            <el-aside class="area-components" width="250px">
                <div v-for="(item, index) in components" :key="index">
                    <div class="c-title">{{ item.title }}</div>
                    <div class="c-list">
                        <draggable :list="item.list"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                            :sort="false"
                            ghost-class='ghost'>
                            <el-card class="c-item" v-for="(cItem, index) in item.list" :key="index" shadow="hover" :body-style="CardBodyStyle">
                                <i :class="cItem.icon"></i>{{cItem.name}}
                            </el-card>
                        </draggable>
                    </div>
                </div>
            </el-aside>

            <el-container class="area-container">
                <Form :data="form"></Form>
            </el-container>

            <el-aside class="area-config" width="250px">
                sdfs
            </el-aside>
        </el-container>

        <el-dialog title="预览" :visible.sync="dialogVisible">
            <created-form :data="form"></created-form>
            <!-- <GenerateForm v-if="dialogVisible" :data="form" :value="widgetModels" ref="generateForm"></GenerateForm> -->
            <span slot="footer">
                <el-button type="primary">获取数据</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Form from './Form'
import CreatedForm from './CreatedForm'

import { components } from '../config/components'

export default {
    name: 'home',
    components: {
        draggable,
        Form,
        CreatedForm
    },
    data () {
        return {
            components,
            CardBodyStyle: {
                padding: '8px 5px'
            },
            form: {
                list: [],
                config: {
                    labelWidth: 100,
                    labelPosition: 'right',
                    size: 'small'
                }
            },
            dialogVisible: false
        }
    },
    methods: {
        handlePreview () {
            console.log(11)
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #ddd;
}
.home {
    height: calc(100% - 60px);
}
.container {
    height: 100%;
}

.area-components {
    padding: 10px;
    .c-title {
        padding: 0 5px 8px;
    }
    .c-item {
        float: left;
        width: 47%;
        margin: 1%;
        cursor: move;
        background: #F4F6FC;
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
    padding: 10px 15px;
    background-color: #eee;
}

</style>
