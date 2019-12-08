export const components = [
    {
        title: '基础自段',
        list: [
            {
                id: 1,
                type: 'input',
                name: '单行文本',
                icon: 'el-icon-notebook-1',
                options: {
                    width: '100%',
                    defaultValue: '',
                    required: false,
                    placeholder: '',
                    disabled: false
                }
            },
            {
                id: 2,
                type: 'textarea',
                name: '多行文本',
                icon: 'el-icon-notebook-2',
                options: {
                    width: '100%',
                    defaultValue: '',
                    required: false,
                    disabled: false,
                    placeholder: ''
                }
            }
        ]
    },
    {
        title: '高级字段',
        list: [
            {
                id: 3,
                type: 'subform',
                name: '子表单',
                icon: 'el-icon-notebook-2',
                list: [],
                options: {
                    width: '100%',
                    defaultValue: '',
                    required: false,
                    disabled: false,
                    placeholder: ''
                }
            }
        ]
    }
]
