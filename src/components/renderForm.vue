<template>
  <div class="form-wrap" ref="renderForm" :configdata="{}">
    <fm-generate-form :data="jsonData" :value="formdata" :dyData="dyData" ref="generateForm"></fm-generate-form>
  </div>
</template>

<script>
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
  },
  methods: {
    // 获取表单配置信息
    getConfigData(configdata) {
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
    },
    // 将流控引擎input数据绑定到value
    getInputData(){
      this.formdata = this.configdata.input_config
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