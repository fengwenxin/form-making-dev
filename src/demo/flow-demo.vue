<template>
    <div class="render-wrap">
        <flowItem ref="flow"
                   :json="json"
                   :edit="edit"
                   :data="data"
                   v-if="data">
        </flowItem>
        <!--<el-button @click="clickHandler">clicked</el-button>-->
        <div style="text-align:center;">
            <el-button type="primary" @click="prevHandle">Back</el-button>
            <el-button type="primary" @click="submitHandle">Submit</el-button>
            <el-button type="primary" @click="cancelHandle">Cancel</el-button>
        </div>
    </div>
</template>

<script>
import getFG from '../util/engine/flow-engine';
import request from "../util/request.js";
import flowItem from './flow-item';
const FG = new getFG();
export default {
    name:'flow-demo',
    components: {
        flowItem
    },
    data() {
        return {
            // 流控数据
            configdata: null,
            // 处理数据
            json: null,
            edit: null,
            data: null,
        };
    },
    created() {
        this.getConfigData();
    },
    methods: {
        // 上一节点
        prevHandle() {
            const {return_node, input_config_code, type} = this.data;
            // 有响应页面
            if (FG.flow.curForm == 'output_config_code' && input_config_code) {

                FG.flow.curForm = 'input_config_code';
                FG.flow.OutFlag = false;
                this.$refs.flow.outPut(input_config_code);

            } else {
                if (return_node) {
                    if (type == FG.FLOW_END) {
                        // this.$handleInfo("流程已经结束");
                        alert("流程已经结束")
                    } else {
                        let flw;
                        this.data = flw = FG.getPrev(return_node);
                        this.edit = FG.getInputData(return_node);
                        const inputConfigCode = flw.input_config_code;
                        const sType = flw.type;
                        if (sType == FG.FLOW_START) {
                            this.json = null;
                            this.edit = null;
                            FG.flow.OutFlag = false;
                            // this.$handleSuccess("已经返回开始节点")
                            alert("已经返回开始节点")
                        } else {

                            this.$refs.flow.outPut(inputConfigCode);
                            FG.flow.curForm = 'input_config_code';
                            FG.flow.OutFlag = false;
                        }
                    }
                } else {
                    // this.$handleWarning("没有返回节点了");
                    alert("没有返回节点了")
                }
            }
        },
        configHandle(next_node){
            this.data = FG.getNext(next_node);
        },
        // 下一节点(跳转的业务判断)
        nextHandle(next_node) {
            if (next_node && next_node.includes(",")) {
                const nodes = next_node.split(",");
                const flow_list = FG.flow.list;

                function filters(j) {
                    let fs = nodes[j];
                    return flow_list.filter(fl => fl.node_code == fs)[0];
                }

                for (let j = 0; j < nodes.length; j++) {
                    const nextFlow = filters(j);
                    const {checkstart} = nextFlow;
                    const nextCode = nextFlow['node_code'];
                    try {
                        // console.log('checkstart', checkstart)
                        if (FG.checkStart(checkstart)) {
                            this.configHandle(nextCode);
                            break;
                        }
                    } catch (e) {
                        throw new Error('nextHandle checkstart执行出错了');
                    }
                }
            } else {
                this.configHandle(next_node);
            }
        },
        // 提交
        submitHandle() {
            if(FG.flow.isOK==false){
                // this.$handleWarning('流程已取消');
                alert("流程已取消");
                return
            }
            const {commit_type, type, next_node, commit_func, node_code, output_config_code} = this.data;
            const commit = commit_func;

            // 开始节点
            if (type == FG.FLOW_START) {
                this.configHandle(next_node);
                return;
            }
            // 结束节点
            if (type == FG.FLOW_END) {
                // this.$handleInfo("流程已经结束");
                alert('流程已经结束');
                return;
            }
            // 响应页面
            if (FG.flow.OutFlag) {
                FG.flow.OutFlag= false;
                this.nextHandle(next_node);
                return false;
            }
            if (type == FG.FLOW_DOING) {
                // 执行节点
                const nodePromise = this.$refs.flow.submitHandle();
                nodePromise.then(data => {
                    console.log('res', data);
                    // 提交类型
                    if (commit_type == FG.COMMIT_TYPE_DEFAULT) {
                        const Obj = {
                            up: data,
                            down: null
                        };
                        FG.commitDefault(data).then(res => {
                            Obj['down'] = res;
                            FG.saveNode(node_code, Obj);
                            alert("提交数据：" + JSON.stringify(Obj));
                            // TODO 有响应页面
                            if (output_config_code) {
                                this.$refs.flow.outPut(output_config_code)
                                FG.flow.OutFlag = true;
                                FG.flow.curForm = "input_config_code";
                            } else {
                                // TODO 无响应页面,直接跳转到下一节点
                                this.nextHandle(next_node);
                            }
                        })
                    } else if (commit_type == FG.COMMIT_TYPE_DEFINE) {
                        commit && commit(data)
                    } else if (commit_type == FG.COMMIT_TYPE_ORDER) {

                    } else if (commit_type == FG.COMMIT_TYPE_LOCAL) {

                    }
                }).catch(e => {
                    // Data verification failed
                    throw  new Error('Data verification failed')
                })
            }
            console.log("======FG===========", FG)
            console.log("======FG.flow.curForm ===========", FG.flow.curForm )
        },
        getConfigData() {
            request.get("http://localhost:3000/flow").then((res) => {
                console.log('res',res)
                FG.setState(res);
                this.configdata = res;

                const start = FG.flow.list.filter(item => item.type == '01')[0];
                const {checkstart, node_code} = start;
                if (FG.checkStart(checkstart)) {
                    this.data = start;
                    FG.flow.isOK = true;
                    console.log(`开始节点${node_code}，检查通过,可以执行`);
                }else {
                    // this.$handleWarning(`当前节点${node_code}不能执行`);
                    alert(`当前节点${node_code}不能执行`)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        // 取消
        cancelHandle() {
            const keys = Object.keys(FG.flow);
            keys.forEach(key => {
                delete  FG.flow[key]
            })
            FG.flow.isOK = false;
            // this.$handleSuccess("已清理这个流程");
            alert("已清理这个流程");
            console.log('FG', FG)
        },
    },
};
</script>

<style>
    .render-wrap {
        margin-top: 20px;
    }
</style>
