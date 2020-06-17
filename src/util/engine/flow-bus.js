
/**
 * 1.响应异步方法
 * 2.执行函数
 */



var str1 = `function commit_define() {
  const a = 1;
  const b = 1;
   return a+b;
}`

var str2 = 'function commit_define() {'+
'const a = 1;'+
'const b = 1;'+
'    return a+b;'+
'}'


// html_encode(commit_define.toString())

function html_encode(str){
  let  s = "";
  if (str.length == 0) return "";
  s = str.replace(/\n/g, "");
  s =  s.replace(/  /g, "");
  return s;
}

function commit_define() {
  const a = 1;
  const b = 1;
  return a+b;
}

function fn() {
  return {
    user: 'flow.BB.up.user',
    transferType: 'flow.BB.up.transferType',
    amount: 'flow.BB.up.amount',
    account_no: 'flow.DD.up.account_no'
  }
}

function getUser() {
  return {
    url: '/vue-admin-template/remote/user',
    method: 'get', func_name:'getUser'
  }
}

function getCity() {
  return {
    url: '/vue-admin-template/remote/city',
    method: 'get', func_name:'getCity'
  }
}

function input_config_BB() {
  return {
    amount: 'flow.platform.amount',
    transferType: 'flow.platform.transferType',
    user: '622002'
  }
}

function input_config_EE() {
  return {
    user: 'flow.BB.up.user',
    transferType: 'flow.BB.up.transferType',
    amount: 'flow.BB.up.amount',
    account_no: 'flow.DD.up.account_no'
  }
}

// const getUser = {url: '/vue-admin-template/remote/user', method: 'get', func_name:'getUser'}
// const getCity = {url: '/vue-admin-template/remote/city', method: 'get', func_name:'getCity'}
// const input_config_BB = "(function getInfo() {return {amount: 'flow.platform.amount', transferType: 'flow.platform.transferType', user:'622002'}})()"
// const input_config_EE  = "(function fn() { return {user:'flow.BB.up.user', transferType:'flow.BB.up.transferType', amount:'flow.BB.up.amount',account_no:'flow.DD.up.account_no'}})()"


export default {
  func:{
    'commit':  `(${html_encode(commit_define.toString())})()` ,
    'getUser': `(${html_encode(getUser.toString())})()`,
    'getCity': `(${html_encode(getCity.toString())})()`,
    'input_config_BB': `(${html_encode(input_config_BB.toString())})()`,
    'input_config_EE': `(${html_encode(input_config_EE.toString())})()`,
  },
  flow_code:"100001",
  list:[
    {
      id:1,
      node_code:"AA",
      node_name:"转账开始",
      flow_code:"100001",
      flow_name:"转账",
      type:"01",
      checkstart: "flow.platform.sysdate>20200101",
      rollback:'',
      rollback_data:'',
      return_node:'',
      next_node:'BB',
      input_config:'',
      input_config_code:'',
      output_config_code:'',
      commit_type:'',
      commit_func:'',
      check_param:'',
      auth_param:'',

      asyn_data:"getUser"
    },
    {
      id:2,
      node_code:"BB",
      node_name:"查询客户 ",
      flow_code:"100001",
      flow_name:"转账",
      type:"03",
      checkstart:"",
      rollback:'',
      rollback_data:'',
      return_node:'AA',
      next_node:'CC,DD',
      // input_config:'this.editData={amount:platform.amount,transferType:platform.transferType,user:"622002"}',
      // input_config:"(function getInfo() {return {amount: platform.amount, transferType: platform.transferType, user:'622002'}})()",
      input_config:"input_config_BB",
      input_config_code:'selectuser',
      output_config_code:'lookuser',
      commit_type:'01',
      commit_func:'',
      check_param:'',
      auth_param:'',

      asyn_data:"getUser,getCity"
    },
    {
      id:3,
      node_code:"CC",
      node_name:"对公转账 ",
      flow_code:"100001",
      flow_name:"转账",
      type:"03",
      checkstart:"flow.user.up.idflag == '1'",
      // checkstart: "platform.sysdate>30200101",
      rollback:'',
      rollback_data:'',
      return_node:'BB',
      next_node:'EE',
      input_config:'const user = BB.user;',
      input_config_code:'gong',
      output_config_code:'',
      commit_type:'01',
      commit_func:'',
      check_param:'',
      auth_param:'',
    },
    {
      id:4,
      node_code:"DD",
      node_name:"个人转账 ",
      flow_code:"100001",
      flow_name:"转账",
      type:"03",
      checkstart:"flow.user.up.idflag == '2'",
      // checkstart: "platform.sysdate>20200101",
      rollback:'',
      rollback_data:'',
      return_node:'AA',
      next_node:'EE',
      input_config:'',
      input_config_code:'privates',
      output_config_code:'',
      commit_type:'01',
      commit_func:'',
      check_param:'',
      auth_param:'',
    },
    {
      id:5,
      node_code:"EE",
      node_name:"交付处理 ",
      flow_code:"100001",
      flow_name:"转账",
      type:"03",
      checkstart:"flow.user.up.idflag == '2'",
      rollback:'',
      rollback_data:'',
      return_node:'BB',
      next_node:'FF',
      input_config:'input_config_EE',
      input_config_code:'jf',
      output_config_code:'',
      commit_type:'01',
      commit_func:'',
      check_param:'',
      auth_param:'',
    },
    {
      id:6,
      node_code:"FF",
      node_name:"转账结束 ",
      flow_code:"100001",
      flow_name:"转账",
      type:"02",
      checkstart:"flow.user.up.idflag == '2'",
      rollback:'',
      rollback_data:'',
      return_node:'AA',
      next_node:'',
      input_config:'',
      input_config_code:'',
      output_config_code:'',
      commit_type:'',
      commit_func:'',
      check_param:'',
      auth_param:'',
    }
  ]
}
