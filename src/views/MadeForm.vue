<template>
    <div class="form-item">
        <el-form label-width="80px">
            <template v-for="item in data.list">
                <render-item :data="item" v-if="item && item.key" :key="item.key"></render-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import RenderItem from '../components/RenderItem'
export default {
    name: 'MadeForm',
    components: {
        RenderItem
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>
