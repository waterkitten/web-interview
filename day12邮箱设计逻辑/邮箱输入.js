function keydown(event) {
    console.log('keydown');
}
function keypress(event) {
    console.log(event.keyCode);
    console.log(event.charCode);
    console.log('keypress');
}
function keyup(event) {
    console.log('keyup');
}




// inputDom的输入监听 = function() {
//     获取用户输入，生成提示框中的提示内容，将提示内容添加到email-sug-wrapper中
//     控制email-sug-wrapper的显示/隐藏状态
// }

// function 获取用户输入() {
//     拿到input输入框的输入内容trim后返回    
// }

// function 生成提示框中的提示内容() {
//     获取用户输入
//     遍历postfixList {
//         把用户输入和每一个postfix进行结合成为每一个Li
//     }
//     返回生成的提示内容
// }

// function 将提示内容添加到email-sug-wrapper中() {
//     获取生成提示框中的提示内容
//     将内容添加到email-sug-wrapper中
// }

// function 控制email-sug-wrapper的显示/隐藏状态() {
//     if 用户输入为空 {
//         隐藏提示框
//     } else {
//         显示提示框
//     }
// }

// function 隐藏提示框() {
//     做具体隐藏提示框的操作
// }

// function 显示提示框() {
//     做具体显示提示框的操作
// }