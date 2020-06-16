<template>
  <div class="form-wrap" ref="renderForm" :configdata="{}">
    <fm-generate-form :data="jsonData" :value="formdata" :dyData="dyData" ref="generateForm"></fm-generate-form>
  </div>
</template>

<script>
// input_config对应的函数值
function input_config_EE() {
  return {
    amount: '流控数据',
    transferType: 'platform.transferType',
    user: '622002'
  }
}
import fmGenerateForm from "./GenerateForm";
import request from "../util/request.js";
export default {
  name: "render-form",
  components: {
    fmGenerateForm,
  },
  props: {
    configdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      jsonData: {},
      formdata: {
        sex: "man"
      },
      dyData: {}  //流控引擎传入的数据
    };
  },
  created() {
    this.getConfigData(this.configdata);
    this.setDynamicData()
    this.getInputData()
  },
  methods: {
    // 获取表单配置信息
    getConfigData(configdata) {
      if(configdata.list[0].input_config_code){
        let codeId = configdata.list[0].input_config_code;
        request
        .get("http://localhost:3000/from",{
          params:{
            id: codeId
          }
        })
        .then(response => {
          this.jsonData = response;
        })
        .catch(error => {
          console.log(error);
        });
      }else{
        return false
      }
    },
    // 将流控引擎input数据绑定到value
    getInputData(){
      try {
        let transObj = eval("("+this.configdata.list[0].input_config+")")()  //封装
        this.formdata = transObj
      } catch (error) {
        throw new Error("input_config解析出错")
      }
      
    },
    // 动态数据获取
    setDynamicData(){
      this.dyData.platform = this.configdata.platform
      this.dyData.user = this.configdata.user
    },
  }
};
</script>

<style>
.form-wrap {
  margin-top: 20px;
}
</style>