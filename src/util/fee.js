class FlowEngine {
  constructor() {
    this.flow = {
      user: {
        user: "feng",
        age: "11",
        address: "beijing001",
        account_no: "6212121212",
        up: {
          idflag: "2"
        }
      },
      platform:{  //PDF
        sysdate:'20200202',
        amount:'99',
        transferType:'2',
        bank:{
          bankId:"0098878",
          banktoken:"#212@112"
        },
      },
      isOK:false,
      func:null,
      flow_code:null,
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
      ],
    };
  }
}


// 返回单例
let getFee= (function () {
  let fee
  return function () {
    if (!fee) {
      fee = new FlowEngine();
    }
    return fee
  }
})()

export default getFee
