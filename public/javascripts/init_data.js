/**
 * 20211015
 * 不考虑兼容,该项目会大量采用es5和es6的语法，少部分es7的语法
 * 用到的库：jquery,react,gsap
 * 其中：react和geap只是为实现某些功能，script.js来自于网络
 * jquery只为简化DOM操作和进行简单的事件监听
 * jquery中文文档 https://jquery.cuishifeng.cn/
 * jquery中文教程 https://www.runoob.com/jquery/jquery-tutorial.html
 */
$(() => {
    //等同于window.onload()
    main();
    btnRegister_onclick();
    btnLogin_onclick();
    btnClear_onclick();
    keyframes();
})

/**
 * @return {boolean}
 * @constructor
 */
function Local_storage() {
    if (localStorage.getItem("name") === null && localStorage.getItem("password") === null) {
        return false;
    } else {
        return true;
    }
}

function keyframes() {
    setTimeout(()=>{
        $("#plan").attr("class","o2")
    },600)
}

/**
 * main函数用于登陆前本地存储的验证
 * 本地有信息就用没有就不用
 */
function main() {
    if (Local_storage()) {
        $("#text").val(localStorage.getItem("name"));
        $("#password").val(localStorage.getItem("password"));
        $("#check").prop("checked", true);
    }
}

/**
 * btnRegister_onclick()注册验证函数，发起请求 enroll.php
 * 该函数用到的方法：
 * 由于原生Ajax封装起来过于麻烦，这里采用es6的fetch方法，虽然兼容性不好，fetch用法自行百度
 * fetch返回的是一个promise对象，可以调用promise对象的then方法
 * str_md5()来源于md5()文件用于数据传输的加密
 */

function btnRegister_onclick() {
    $(".zc").click(() => {
        let name = $("#text").val();
        let password = $("#password").val();
        fetch("/server/enroll", {
            method: "POST",
            headers: {"Content-Type": "Application/x-www-form-urlencoded"},
            body: `name=${str_md5(name)}&password=${str_md5(password)}`
        })
            .then(value => value.json())
            .then(value => {
                if (value) {
                    alert("注册成功，请登录");
                } else {
                    alert("注册失败，用户名重复");
                }
            })
        // .catch(reason => console.log(`%c ERROR: ${reason}`, "color:red"))
    })
}


/**
 * btnLogin_onclick()登录功能实现函数
 */
function btnLogin_onclick() {
    $(".dl").click(() => {
        let name = $("#text").val();
        let password = $("#password").val();
        let chexkbox = $("#check").prop("checked");
        fetch("server/login", {
            method: "POST",
            headers: {"Content-Type": "Application/x-www-form-urlencoded"},
            body: `name=${str_md5(name)}&password=${str_md5(password)}`
        })
            .then(value => value.json())
            .then(value => {
                if (value) {
                    if (chexkbox) {
                        localStorage.setItem("name", name);
                        localStorage.setItem("password", password);
                    } else {
                        localStorage.clear();
                        $("#text").val("");
                        $("#password").val("");
                    }
                    location.href = "http://127.0.0.1/html/order?id=0"
                } else {
                    alert("登陆失败");
                }
            })
        // .catch(reason => console.log(`%c ERROR: ${reason}`, "color:red"))
    })
}

/**
 * 清空输入框
 */
function btnClear_onclick() {
    $(".cz").click(() => {
        $("#text").val("");
        $("#text").focus();
        $("#password").val("");
        $("#check").prop("checked", false)
    })
}

