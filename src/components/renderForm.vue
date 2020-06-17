<template>
    <div class="form-wrap" ref="renderForm">
        <!--item:-->
        <!--{{item}} <hr>-->
        <!--platform: {{platform}}<hr>-->
        <!--user: {{user}}<hr>-->
        <!--nodesLength: {{nodesLength}}<hr>-->

        <fm-generate-form
                :remote="remoteFuncs"
                :data="jsonData"
                :value="formdata"
                :dyData="dyData"
                ref="generateForm">
        </fm-generate-form>
    </div>
</template>

<script>
    // input_config对应的函数值
    function input_config_EE() {
        return {
            amount: '流控数据',
            // transferType: 'flow.platform.transferType',
            transferType: '1',
            user: '622002'
        }
    }

    function input_config_BB() {
        return {
            amount: '流控数据',
            transferType: '1',
            user: '622001112244409014'
        }
    }

    import fmGenerateForm from "./GenerateForm";
    import request from "../util/request.js";

    export default {
        name: "render-form",
        components: {
            fmGenerateForm,
        },
        props: ['configdata', 'remoteFuncs'],
        data() {
            return {
                jsonData: {},
                formdata: {},
                dyData: {}  //流控引擎传入的数据
            };
        },
        created() {
            // 1
            const list = this.configdata.list;
            if(list && list.length){
                const {input_config_code} = list[0];
                this._getConfigData(input_config_code).then(res=>{
                    this.jsonData = res;
                }).catch(error => {
                    console.log(error);
                })
            }
            // 2
            const {platform, user} = this.setDynamicData();
            this.dyData = {
                platform,
                user
            };
            // 3
            this.formdata = this.getInputData();

        },
        computed: {
            nodesLength() {
                return this.configdata && this.configdata.list.length > 0
            }
        },
        methods: {
            outPuts(output_config_code){
                // 响应页面
               this._getConfigData(output_config_code).then(res=>{
                   this.jsonData = res;
               })
            },
            // 获取表单配置信息
            _getConfigData(input_config) {
                if (input_config) {
                    return request.get("http://localhost:3000/" + input_config)
                } else {
                    return false
                }
            },
            // 将流控引擎input数据绑定到value
            getInputData() {
                console.log('getInputData....input_config_BB')
                const list = this.configdata.list;
                if(list.length){
                    const {input_config} = list[0];
                    try {
                        if (input_config) {
                            let transObj = eval("(" + input_config + ")")()  //封装
                            console.log('transObj',transObj)
                            // console.log('this.configdata.list',this.configdata.list)
                            return transObj;
                        }
                    } catch (error) {
                        throw new Error("input_config解析出错",input_config)
                    }
                }
                return '';
            },
            // 动态数据获取
            setDynamicData() {
                return {
                    platform: this.configdata.platform,
                    user: this.configdata.user
                }
            },
            // 获取表单数据
            getData() {
                return this.$refs.generateForm.getData();
            },
        },
        watch:{
            configdata:{
                deep: true,
                handler(val) {
                    console.warn('=========configdata===========',val)
                    const list = this.configdata.list;
                    if(list && list.length){
                        const {input_config_code} = list[0];
                        this._getConfigData(input_config_code).then(res=>{
                            this.jsonData = res;
                        }).catch(error => {
                            console.log(error);
                        })
                    }

                },
            }
        },
    };
</script>

<style lang="scss" scoped>
    .form-wrap {
        margin-top: 20px;
    }
</style>
