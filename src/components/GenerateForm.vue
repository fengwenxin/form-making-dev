<template>
  <div v-if="!isDataNull">
    <el-form
      ref="generateForm"
      label-suffix=":"
      :size="data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config.labelPosition"
      :label-width="data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <template v-if="item.type == 'grid'">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list">
                <el-form-item
                  v-if="citem.type=='blank'"
                  :label="citem.name"
                  :prop="citem.model"
                  :key="citem.key"
                >
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item
                  v-else
                  :key="citem.key"
                  :models.sync="models"
                  :remote="remote"
                  :rules="rules"
                  :widget="citem"
                  @input-change="onInputChange"
                ></genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>

        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.name" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>

        <template v-else>
          <genetate-form-item
            :key="item.key"
            :models.sync="models"
            :rules="rules"
            :widget="item"
            @input-change="onInputChange"
            @el-change="onElChange"
            :remote="remote"
            :ref="item.model"
            v-show="!item.options.hidden"
            :class="item.options.customClass"
          ></genetate-form-item>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from "./GenerateFormItem";
import { loadJs } from "../util/index.js";
export default {
  name: "fm-generate-form",
  components: {
    GenetateFormItem
  },
  /**
   * data为表单渲染原始数据
   * remote为获取服务端数据的回调函数
   * value为覆盖表单原始默认值的数据
   * dyData为公共区动态数据
   */
  props: ["data", "remote", "value", "insite", "dyData"],
  data() {
    return {
      isDataNull: true, // 判断props传入的data是否有真实数据
      models: {}, // form表单对象所有组件key value组成的json
      rules: {}, // form表单对象所有组件对应校验规则
      hideObj: {}, // 后期添加非form making自有属性，用于存储表单隐藏条件的字段
      haveHide: false, // 后期添加非form making自有属性，是否触发过节点隐藏
      allInput: [], //全部input节点
      allInputsmark: [], // 由true false填充的全部input节点
      focusIndex: 0, // 后期添加非form making自有属性，当前可聚焦节点下标
      intervalId: null,   //定时器ID
    };
  },
  mounted() {
    // 这个定时器主要是解决父组件异步传值，子组件生命周期获取不到数据的问题
    this.intervalId = setInterval(() => {
      if (!this.isDataNull) {
        this.flowHandel(this.data.list);
        clearInterval(this.intervalId)
      }
    }, 200);
    
  },
  methods: {
    // 数据初始化完成后流程控制操作
    flowHandel(flowData) {
      for (let i = 0; i < flowData.length; i++) {
        this.hideData(flowData[i], i);
        this.setInputItems(flowData[i]);
      }
      this.allInput = document.querySelectorAll("input");
      this.handelFocus();
      console.log(this.focusIndex)
    },
    // 动态数据处理函数
    dynamicData(targetdata) {
      // 动态数据赋值
      let pdf = this.dyData.platform;
      let user = this.dyData.user;
      if (
        targetdata.options.defaultValue != "" &&
        targetdata.options.defaultValue[0] == "@"
      ) {
        var temp = targetdata.options.defaultValue.substring(1);
        var tempJson = eval(temp);
        if (tempJson != "" || tempJson != null) {
          targetdata.options.defaultValue = tempJson;
        }
      }
    },
    // 生成models、rules对象
    generateModle(genList) {
      for (let i = 0; i < genList.length; i++) {
        //  FIXME 设置响应式属性 hideObj

        if (genList[i].hidden && genList[i].hidden !== "") {
          this.$set(
            this.hideObj,
            genList[i].model,
            genList[i].options.defaultValue || ""
          );
        }
        // FIXME 动态数据处理
        this.dynamicData(genList[i]);

        // 流控引擎数据处理(数据暂时没有与组件绑定的，先不处理)

        if (genList[i].type === "grid") {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list);
          });
        } else {
          // 处理非表格类型的组件
          if (
            // 如果value对象不为空且具有与当前组件model同名的属性，则将值赋给models的该属性（这样就修改了组件原始值）
            this.value &&
            Object.keys(this.value).indexOf(genList[i].model) >= 0
          ) {
            this.models[genList[i].model] = this.value[genList[i].model];
          } else {
            // 如果value为空判断当前组件的类型是否为空类型
            if (genList[i].type === "blank") {
              console.log("g2");
              // 如果为空类型则为models添加对应的响应式属性，并赋值为默认值
              this.$set(
                this.models,
                genList[i].model,
                genList[i].options.defaultType === "String" // 如果默认类型为字符串类型赋值为空字符串
                  ? ""
                  : genList[i].options.defaultType === "Object" //如果不是字符串类型判断是否是对象类型，如果是赋值空对象，否则赋值空数组
                  ? {}
                  : []
              );
            } else {
              // 如果value为空并且组件为非空类型组件将组件默认值赋值给models对应属性
              // 这个if条件为后期加入的，判断是否已触发过隐藏条件
              if (!this.haveHide) {
                this.models[genList[i].model] = genList[i].options.defaultValue;
              }

              // 组件创建完成后models为组件 key:value 键值对json
            }
          }
          // 如果rules对象存在当前组件的校验规则
          if (this.rules[genList[i].model]) {
            // 执行此段代码后rules的每个属性为组件默认校验规则和传入检验规则组成的数组
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model], // 将当前数组值展开
              ...genList[i].rules.map(item => {
                // 展开当前组件的校验规则数组，遍历数组每一项（为json）
                if (item.pattern) {
                  // 如果存在 pattern属性则返回一个新对象，该对象包含此条校验规则的所有属性以及pattern属性，值为item.pattern的返回值
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  // 不存在pattern属性则返回所有item组成的新对象
                  return { ...item };
                }
              })
            ];
          } else {
            // 如果rules对象不存在当前组件的校验规则则展开传入的校验规则
            this.rules[genList[i].model] = [
              ...genList[i].rules.map(item => {
                if (item.pattern) {
                  return { ...item, pattern: eval(item.pattern) };
                } else {
                  return { ...item };
                }
              })
            ];
          }
        }
      }
    },
    // 验证并获取输入框当前的值
    getData() {
      return new Promise((resolve, reject) => {
        // 执行form表单验证函数
        this.$refs.generateForm.validate(valid => {
          if (valid) {
            // 逐条验证当前组件的校验规则
            resolve(this.models);
          } else {
            reject(new Error(this.$t("fm.message.validError")).message);
          }
        });
      });
    },
    // 重置表单
    reset() {
      this.$refs.generateForm.resetFields();
    },
    // 数据改变时遍历数据判断隐藏条件
    hideData(activedata, activeIndex) {
      //判断显示隐藏
      if (activedata.hidden && activedata.hidden !== "") {
        if (eval(activedata.hidden)) {
          this.haveHide = true;
          activedata.options.hidden = true;
          this.allInputsmark[activeIndex] = false;
        } else if (this.haveHide && !eval(activedata.hidden)) {
          activedata.options.hidden = false;
          this.allInputsmark[activeIndex] = true;
        }
      }
    },
    // 监听表单数据改变
    onInputChange(value, field) {
      this.hideObj[field] = value;
      let originData = this.data.list;
      for (let i = 0; i < originData.length; i++) {
        this.hideData(originData[i], i);
      }
      // 向container组件发射on-change事件，将 key value 以及models（form表单的key value对象）传入
      this.$emit("on-change", field, value, this.models);
    },
    // 全部input节点依据是否可用动态添加 true false 到 this.allInputsmark
    setInputItems(originData) {
      // 显示且非禁用元素
      if (
        originData.options.hidden == true ||
        originData.options.disabled ||
        originData.options.readonly == "readonly"
      ) {
        this.allInputsmark.push(false);
      } else {
        this.allInputsmark.push(true);
      }
    },
    // 光标操作控制流程
    handelFocus() {
      for (let i = this.focusIndex; i < this.allInputsmark.length; i++) {
        if (this.allInputsmark[i]) {
          this.allInput[i].focus();
          console.log(this.focusIndex)
          this.focusIndex = i + 1;
          break;
        }
      }
    },
    // 监听input组件发射的el-change事件
    onElChange(e) {
      this.getData().then(resolve => {
        this.handelFocus();
        console.log(this.focusIndex)
      });
      this.$emit("input-enter");
    }
  },
  watch: {
    data: {
      // 深度观察表单渲染对象，如果数据变更再次执行model生成函数
      deep: true,
      handler(val) {
        this.isDataNull = false;
        this.generateModle(val.list);
      }
    },
    value: {
      // 深度观察组件key值
      deep: true,
      handler(val) {
        console.log(JSON.stringify(val));
        this.models = { ...this.models, ...val };
      }
    }
  }
};
</script>

<style lang="scss">
// @import '../styles/cover.scss';
</style>
