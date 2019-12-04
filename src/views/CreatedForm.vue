<template>
    <div class="form-item">
        <el-form label-width="80px">
            <template v-for="item in data.list">
                <el-form-item :label="item.name"
                    v-if="item && item.key"
                    :key="item.key">

                    <form-item :data="item"></form-item>

                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script>
import FormItem from './FormItem'
export default {
    name: 'CreatedForm',
    components: {
        FormItem
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
