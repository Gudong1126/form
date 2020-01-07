export const components = [
    {
        title: '基础自段',
        list: [
            {
                id: 1,
                type: 'Input',
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
                type: 'Textarea',
                name: '多行文本',
                icon: 'el-icon-notebook-2',
                options: {
                    width: '100%',
                    defaultValue: '',
                    required: false,
                    disabled: false,
                    placeholder: ''
                }
            },
            {
                type: 'Radio',
                name: '单选框组',
                icon: 'el-icon-open',
                options: {
                    inline: true,
                    defaultValue: '',
                    required: false,
                    remoteFunc: false, // 是否使用接口获取选项
                    disabled: false,
                    options: [
                        {
                            value: '选项1',
                            label: '选项1'
                        },
                        {
                            value: '选项2',
                            label: '选项2'
                        }
                    ],
                    props: {
                        value: 'value',
                        label: 'label'
                    }
                }
            },
            {
                type: 'Checkbox',
                name: '多选框组',
                icon: 'el-icon-set-up',
                options: {
                    inline: true,
                    defaultValue: [],
                    required: false,
                    remoteFunc: false, // 是否使用接口获取选项
                    disabled: false,
                    options: [
                        {
                            value: '选项1',
                            label: '选项1'
                        },
                        {
                            value: '选项2',
                            label: '选项2'
                        }
                    ],
                    props: {
                        value: 'value',
                        label: 'label'
                    }
                }
            }
        ]
    },
    {
        title: '高级字段',
        list: [
            {
                id: 3,
                type: 'Subform',
                name: '子表单',
                icon: 'el-icon-notebook-2',
                list: [],
                options: {
                    width: '100%',
                    disabled: false
                }
            },
            {
                id: 4,
                type: 'Tabs',
                name: '标签',
                icon: 'el-icon-notebook-2',
                options: {
                    disabled: false,
                    tabs: [
                        {
                            title: 'tabs1',
                            key: 'tabs1',
                            list: []
                        },
                        {
                            title: 'tabs2',
                            key: 'tabs2',
                            list: []
                        }
                    ]
                }
            }
        ]
    }
]
