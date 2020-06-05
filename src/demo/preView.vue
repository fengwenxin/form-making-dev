<template>
  <div class="render-wrap">
    <render-form v-if="configdata!=null" :configdata="configdata" ref="renderForm"></render-form>
  </div>
</template>

<script>
import renderForm from "../components/renderForm.vue"
import request from "../util/request.js";
export default {
  components: {
    renderForm,
  },
  data() {
    return {
      configdata: null
    };
  },
  created(){
    this.getConfigData()
  },
  methods:{
    getConfigData(){
      request
      .get("http://localhost:3000/flow")
      .then( res =>{
        this.configdata = res;
      })
      .catch( error =>{
        console.log(error)
      })
    }
  }
};
</script>

<style>
.render-wrap {
  margin-top: 20px;
}
</style>