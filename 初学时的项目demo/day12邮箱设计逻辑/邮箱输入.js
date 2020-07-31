var postfixList = ['@163.com', '@gmail.com', '@126.com', '@qq.com', '@263.net'];
var inputDom = document.getElementById('email-input');
var ulDom = document.getElementById('email-sug-wrapper');
var list = '';//提示内容
var lists = '';
inputDom.onkeyup = function() {
    add();
    control();
}

function getInput() {
    var trim=inputDom.value;
    return trim;
}

function content() {
    var trim=getInput();
    for(var i=0;i<postfixList.length;i++) {
        list += '<li>' + trim + postfixList[i] + '</li>'; 
    }
    return list;
}

function  remove(list) {
   ulDom.removeChild(ulDom,firstChild);
}
function add() {
    lists = content();           //获取生成提示框中的提示内容
    /*remove(list);*/
    ulDom.innerHTML = lists;    //将内容添加到email-sug-wrapper中
}

function control() {
    if (getInput()==null) {
        hidden();
    } else {
        show();
    }
}

function hidden() {
    ulDom.style.display='none';
}

function show() {
   ulDom.style.display='block';// 做具体显示提示框的操作
}