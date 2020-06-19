<template>
  <div class="render-wrap">
    <render-form
      v-if="configdata != null"
      :configdata="configdata"
      ref="renderForm"
    ></render-form>

    <el-button @click="clickHandler">clicked</el-button>
  </div>
</template>

<script>
import renderForm from "../components/renderForm.vue";
import request from "../util/request.js";
export default {
  components: {
    renderForm,
  },
  data() {
    return {
      configdata: null,
    };
  },
  created() {
    this.getConfigData();
  },
  methods: {
    getConfigData() {
      request
        .get("http://localhost:3000/flow")
        .then((res) => {
          this.configdata = res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clickHandler(){
      console.log('this.$refs.renderForm',this.$refs.renderForm.getData());
        this.$refs.renderForm.getData().then(res => {
            console.log('res', JSON.stringify(res))
        })
    }
  },
};
</script>

<style>
.render-wrap {
  margin-top: 20px;
}
</style>
