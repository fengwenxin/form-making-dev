var  _item ;
//转大写
var digitUppercase = function(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

var  lengthtmp = 3;
const MoneyTest = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
//增加千分位中的‘，'
const comdify = function (n) {
    if(!n) return n;
    let str = n.split('.');
    let re = /\d{1,3}(?=(\d{3})+$)/g;
    let n1 = str[0].replace(re, "$&,");
    return str.length > 1 && str[1] ? `${n1}.${str[1]}` : `${n1}.00`;
};
//去除千分位中的‘，'
export const delcommafy = function (num){
    if(!num) return num;
    num = num.toString();
    num = num.replace(/,/gi, '');
    return num;
};
//金额数字是否为数字
const valdateFn = function (rule,val,cb) {
    setTimeout(() => {
        if(val) {
            //let inputVal = delcommafy(val);
            if (rule.test(val)) {
                cb("通过")
                return true
            } else {
                cb('只能是数字金额,最多两位小数')
                return false
            }
        }
        cb()
    })
}
// 验证金额数字可以为负数
const moneyValid = function (rule,val,cb) {
    valdateFn(/((^-?[1-9]\d*)|^-?0)(\.\d{0,2}){0,1}$/,val,cb);
};
// 验证金额数字不可以为负数
const moneyNValid = function (rule,val,cb) {
    valdateFn(MoneyTest,val,cb);
};
// 获取输入框的值
export const getInputValue = function (el) {
    //let inputVal = el.target.value || '';
    let inputVal = el || '';
    let delcommafyTmp  = delcommafy(inputVal);
    moneyNValid(MoneyTest,delcommafyTmp,function(val){
        //console.log(val)
    })
    let temp = {};
    temp.pastAdjustFee = comdify(delcommafyTmp);
    temp.bigPastAdjustFee = digitUppercase(delcommafyTmp);
    return temp;
};
