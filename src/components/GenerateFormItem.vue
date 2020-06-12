<template>
  <el-form-item :label="widget.name" :prop="widget.model">
    <template v-if="widget.type == 'input'">
      <!-- <el-popover
        width="500"
        placement="top-start"
        trigger="hover"
        v-if="!widget.options.disabled"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
        <el-button :style="{'border':'0'}" slot="reference" icon="el-icon-question"></el-button>
      </el-popover> -->
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer' || widget.options.dataType == 'float'"
        type="number"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      ></el-input>
      <!-- dataType为组件类型 dataModel为双向绑定的数据 -->
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        @keyup.native.enter="change"
        :ref="widget.model"
      ><el-button v-if="widget.options.showTips" @click="showTips(widget.options.tips)" slot="prepend" icon="el-icon-question"></el-button></el-input>
    </template>
    <template v-if="widget.type == 'hrinput'">
      <hr-input
        :type="widget.options.type"
        :maxlength="widget.options.maxlength"
        v-model="widget.options.defaultValue"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      ></hr-input>
    </template>
    <template v-if="widget.type == 'textarea'">
      <el-input
        type="textarea"
        :rows="5"
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        @keyup.native.ctrl.enter="areaHandel"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        controls-position="right"
        :disabled="widget.options.disabled"
        @keyup.native.enter="change"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :disabled="widget.options.disabled"
      >
        <el-checkbox
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
        @keyup.native.enter="change"
      ></el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
        @keyup.native.enter="change"
      ></el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate
        v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :filterable="widget.options.filterable"
      >
        <el-option
          v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)"
          :key="item.value"
          :value="item.value"
          :label="widget.options.showLabel || widget.options.remote?item.label:item.value"
        ></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch v-model="dataModel" :disabled="widget.options.disabled"></el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
        :multiple="widget.options.multiple"
        :length="widget.options.length"
        :is-qiniu="widget.options.isQiniu"
        :is-delete="widget.options.isDelete"
        :min="widget.options.min"
        :is-edit="widget.options.isEdit"
        :action="widget.options.action"
      ></fm-upload>
    </template>

    <template v-if="widget.type == 'editor'">
      <vue-editor v-model="dataModel" :style="{width: widget.options.width}"></vue-editor>
    </template>

    <template v-if="widget.type == 'cascader'">
      <el-cascader
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
        :options="widget.options.remoteOptions"
      ></el-cascader>
    </template>

    <template v-if="widget.type == 'text'">
      <span>{{dataModel}}</span>
    </template>
  </el-form-item>
</template>

<script>
import FmUpload from "./Upload";

export default {
  props: ["widget", "models", "rules", "remote"],    // widget为当前组件json数据
  components: {
    FmUpload
  },
  data() {
    return {
      dataModel: this.models[this.widget.model],   // 当前组件的默认值，是双向绑定的
    };
  },
  created() {
    if (
      // 如果获取远程数据属性为真且指定了获取数据的回调函数
      this.widget.options.remote &&
      this.remote[this.widget.options.remoteFunc]
    ) {
      // 执行对应的回调函数
      this.remote[this.widget.options.remoteFunc](data => {     //this.remote为所有回调函数组成的json对象
        this.widget.options.remoteOptions = data.map(item => {  //remoteOptions 表单动态选项配置
          return {
            value: item[this.widget.options.props.value],
            label: item[this.widget.options.props.label],
            children: item[this.widget.options.props.children]
          };
        });
      });
    }
    // 七牛图片上传
    if (this.widget.type === "imgupload" && this.widget.options.isQiniu) {
      this.remote[this.widget.options.tokenFunc](data => {
        this.widget.options.token = data;
      });
    }
  },
  methods: {
    focus(){
      // this.$on("focus",function(){
      //   focus()
      // })
    },
    showTips(msg){
      this.$message({
          showClose: true,
          duration: 5000,
          message: msg
        });
    },
    // element change事件，回车和失去焦点时触发
    change(){
      // 出发change事件时发射 el-change事件，generateform组件监听该事件
      this.$emit("el-change",this)
    },
    // textarea ctrl+enter事件
    areaHandel(e){
      this.$emit("text-enter",this)
    }
  },
  watch: {
    dataModel: {
      // 深度监听组件绑定的数据，执行赋值操作并发射更新models的事件，发射input-change事件，将值和对应的key传入
      deep: true,
      handler(val) {
        this.models[this.widget.model] = val;
        this.$emit("update:models", {
          ...this.models,
          [this.widget.model]: val
        });
        this.$emit("input-change", val, this.widget.model);
      }
    },
    models: {
      // 深度监听models，models修改时读取修改后的值赋值给dataModel
      deep: true,
      handler(val) {
        this.dataModel = val[this.widget.model];
      }
    }
  }
};
</script>
