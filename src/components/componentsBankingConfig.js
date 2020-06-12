export const bankingComponents = [
    {
        type: 'password',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'password',
            amountmoney: false,
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },
    {
        type: 'againpassword',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: 'againpassword',
            confirm_field: '',
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },
    {
        type: 'amount',
        icon: 'icon-input',
        options: {
            hidden: false,
            width: '100%',
            defaultValue: '',
            required: false,
            dataType: '',
            amountmoney: true,
            // amountvisible: false,
            decimal: '',
            pattern: '',
            placeholder: '',
            disabled: false,
            tips:"暂无提示信息"
        }
    },

]


