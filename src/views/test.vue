<template>
    <div class="about">
        <el-form :model="data" ref="form" :rules="rules" label-width="100px">
          <el-form-item label="测试" prop="name">
              <el-input v-model="test"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="submitForm('form')">测试</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            test: '',
            rules: {
                name: [
                    { required: true, message: '请输入活动名称' }
                ]
            },
            data: {
                name: ''
            }
        }
    },
    watch: {
        test (val) {
            console.log(val)
            this.data.name = val
        }
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('submit')
                    console.log(this.data)
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
