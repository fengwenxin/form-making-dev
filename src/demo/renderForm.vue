<template>
  <div class="form-wrap" ref="renderForm" :configdata="{}">
    <!-- <el-button type="primary" @click="handleUpload">导入JSON</el-button>
    <cus-dialog
      :visible="uploadVisible"
      @on-close="uploadVisible = false"
      @on-submit="handleUploadJson"
      ref="uploadJson"
      width="800px"
      form
    >
      <el-alert type="info" :title="$t('fm.description.uploadJsonInfo')"></el-alert>
      <div id="uploadeditor" style="height: 400px;width: 100%;">{{jsonEg}}</div>
    </cus-dialog> -->
    <fm-generate-form :data="jsonData" :value="formdata" :dyData="dyData" ref="generateForm"></fm-generate-form>
  </div>
</template>

<script>
import fmGenerateForm from "../components/GenerateForm";
// import CusDialog from "../components/CusDialog";
import request from "../util/request.js";

export default {
  name: "render-form",
  components: {
    fmGenerateForm,
    // CusDialog
  },
  props: {
    configdata: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // uploadVisible: false,
      // widgetForm: {
      //   list: [],
      //   config: {
      //     labelWidth: 100,
      //     labelPosition: "right",
      //     size: "small"
      //   }
      // },
      // widgetFormSelect: null,
      // uploadEditor: null,
      // jsonEg: `{
      //   "list": [],
      //   "config": {
      //     "labelWidth": 100,
      //     "labelPosition": "top",
      //     "size": "small"
      //   }
      // }`,
      jsonData: {
        list: [
          {
            type: "input",
            icon: "icon-input",
            options: {
              hidden: false,
              width: "100%",
              defaultValue: "",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: true,
              remoteFunc: "func_1591088735000_13719"
            },
            name: "单行文本",
            hidden: "",
            key: "1591088735000_13719",
            model: "input_1591088735000_13719",
            rules: [{ type: "string", message: "单行文本格式不正确" }]
          },
          {
            type: "input",
            icon: "icon-input",
            options: {
              hidden: false,
              width: "100%",
              defaultValue: "",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: false,
              remoteFunc: "func_1591088737000_49671"
            },
            name: "单行文本",
            hidden: "",
            key: "1591088737000_49671",
            model: "radio",
            rules: []
          },
          {
            type: "input",
            icon: "icon-input",
            options: {
              hidden: false,
              width: "100%",
              defaultValue: "",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: false,
              remoteFunc: "func_1591088738000_65605"
            },
            name: "单行文本",
            hidden: "this.hideObj.radio == 2",
            key: "1591088738000_65605",
            model: "input_1591088738000_65605",
            rules: []
          },
          {
            type: "input",
            icon: "icon-input",
            options: {
              hidden: false,
              width: "100%",
              defaultValue: "@pdf.amount",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: true,
              remoteFunc: "func_1591088739000_43411"
            },
            name: "单行文本",
            hidden: "",
            key: "1591088739000_43411",
            model: "input_1591088739000_43411",
            rules: []
          },
          {
            type: "input",
            icon: "icon-input",
            options: {
              hidden: false,
              width: "100%",
              defaultValue: "",
              required: false,
              dataType: "string",
              pattern: "",
              placeholder: "",
              disabled: false,
              remoteFunc: "func_1591088741000_77079"
            },
            name: "单行文本",
            hidden: "",
            key: "1591088741000_77079",
            model: "input_1591088741000_77079",
            rules: []
          }
        ],
        config: { labelWidth: 100, labelPosition: "right", size: "small" }
      },
      formdata: {
        sex: "man"
      },
      dyData: {}
    };
  },
  created() {
    // this.getConfigData(this.configdata);
  },
  methods: {
    // 获取表单配置信息
    getConfigData(configdata) {
      let codeId = configdata.input_config_code;
      request
        .get("/formdata", {
          params:{
            id: codeId
          }
        })
        .then(response => {
          console.log(response);
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
    getDynamicData(){
      request
      .get("data")
      .then( response => {
        this.dyData = response
      })
      .catch( error => console.log(error) )
    },
    // 获取表单
    // handleUpload() {
    //   this.uploadVisible = true;
    //   this.$nextTick(() => {
    //     this.uploadEditor = ace.edit("uploadeditor");
    //     this.uploadEditor.session.setMode("ace/mode/json");
    //   });
    // },
    // handleUploadJson() {
    //   try {
    //     this.setJSON(JSON.parse(this.uploadEditor.getValue()));
    //     this.uploadVisible = false;
    //   } catch (e) {
    //     this.$message.error(e.message);
    //     this.$refs.uploadJson.end();
    //   }
    // },
    // setJSON(json) {
    //   console.log(json);
    //   this.jsonData = json;
    // }
  }
};
</script>

<style>
.form-wrap {
  margin-top: 20px;
}
</style>