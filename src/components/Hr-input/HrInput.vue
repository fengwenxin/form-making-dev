<template>
  <div class="hr-input-wrap">
    <div v-if="type!=='textarea'" class="hr-input hr-input--prefix">
      <input
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :value="value"
        ref="input"
        v-bind="$attrs"
        :autofocus="autofocus"
        :autocomplate="autocomplate"
        class="hr-input-inner"
      />
      <!-- input前置内容 -->
      <span class="hr-input-prefix">
        <i class="hr-input-prefix-inner iconfont"></i>
      </span>
      <!-- input后置内容 -->
      <span class="hr-input-suffix">
        <i class="hr-input-suffix-inner"></i>
      </span>
    </div>
    <div v-else class="hr-textarea">
      <textarea
        :placeholder="placeholder"
        :readonly="readonly"
        :value="value"
        ref="textarea"
        v-bind="$attrs"
        :autofocus="autofocus"
        :autocomplate="autocomplate"
        @input="handelInput"
      ></textarea>
      <span class="hr-input-count">{{textLength}}/{{upperLimit}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "HrInput",
  inheritAttrs: false,
  props: {
    type: String,
    placeholder: String,
    readonly: Boolean,
    disable: Boolean,
    // maxlength: Number,
    minlength: Number,
    value: [String, Number],
    autofocus: Boolean,
    autocomplate: {
      type: String,
      default: "on"
    }
  },
  data() {
    return {
      
    };
  },
  computed: {
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      return (this.value || "").length;
    }
  },
  mounted() {
    if (this.autofocus) {
      this.focus();
    }
  },
  methods: {
    focus() {
      this.getInput().focus();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    handelInput(e){
      this.$emit('input',e.target.value)
    }
  }
};
</script>

<style>
.hr-input,
.hr-textarea {
  display: inline-block;
  font-size: 14px;
  position: relative;
}
.hr-input-inner {
  border-radius: 4px;
  border: 1px solid #7eca8e;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  width: 100%;
}
.hr-input--suffix {
  margin-left: 15px;
}
.hr-input--prefix {
  margin-right: 15px;
}
.hr-input--prefix .hr-input-inner {
  padding-left: 30px;
}
.hr-input--suffix .hr-input-inner {
  padding-left: 30px;
}
.hr-input-prefix,
.hr-input-suffix {
  position: absolute;
  width: 25px;
  height: 100%;
  top: 0;
  text-align: center;
  color: #c0c4cc;
  transition: all 0.3s;
  pointer-events: none;
}
.hr-input-prefix {
  left: 5px;
}
.hr-input-suffix {
  right: 5px;
}
.hr-input-prefix-inner,
.hr-input-suffix-inner {
  position: relative;
  height: 100%;
  width: 25px;
  display: inline-block;
  line-height: 40px;
}
.hr-input-prefix-inner::before,
.hr-input-suffix-inner::after {
  position: absolute;
  content: "\e65f";
  top: 0;
  height: 100%;
  width: 25px;
}
.hr-input-prefix-inner::before {
  left: 0;
}
.hr-input-suffix-inner::after {
  right: 0;
}
.hr-textarea > textarea {
  display: block;
  min-width: 300px;
  max-width: 400px;
  resize: vertical;
}
.hr-input-count {
  color: #909399;
  background: #fff;
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  right: 10px;
}
</style>