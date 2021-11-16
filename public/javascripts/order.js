$(() => {
    main()
    qingqiu(0)
    sum()
    fenye()
})
//分页锁
let sock = true;
let start = 20
//请求多次触发锁
let scok_ajax = true;

/**
 * main方法为主方法，是注册动画，执行默认效果的地方
 */
function main() {
    $("#main").prop("class", "donghua");
    setTimeout(() => {
        $("#value").prop("class", "donghua");
    }, 300)
    $("#orderid").focus(() => {
        $(".footer button").removeAttr("disabled").css({
            "cursor": "pointer",
            "color": "#000"
        })
        $(".footer button").hover(function () {
            $(this).css({
                    "background": "#424242",
                    "color": "#fff"
                }
            )
        }, function () {
            $(this).css({
                    "background": "#9a9a9a",
                    "color": "#000"
                }
            )
        })
    }).blur(() => {
        if ($("#lxdh").val() === "" && $("#orderid").val() === "") {
            $(".footer button").attr("disabled", "disabled").css({
                "cursor": "default",
                "background": "#9a9a9a",
                "color": "rgba(16, 16, 16, 0.3) "
            })
        }
    })
    $("#main input").focus(() => {
        $(".clear").removeAttr("disabled").css({
            "cursor": "pointer",
            "color": "#000"
        })
        $(".footer button").hover(function () {
            $(this).css({
                    "background": "#424242",
                    "color": "#fff"
                }
            )
        }, function () {
            $(this).css({
                    "background": "#9a9a9a",
                    "color": "#000"
                }
            )
        })
    }).blur(() => {
        if (panduan() && $("#je").val() === "0" && $("#sl").val() === "0" && $("#dj").val() === "0") {
            $(".clear").removeAttr("disabled").css({
                "cursor": "default",
                "background": "#9a9a9a",
                "color": "rgba(16, 16, 16, 0.3) "
            })
            $(".clear").attr("disabled", "disabled")
        }
    })
}

/**
 * 判断表单，增加用户体验
 * @return {boolean}
 */
function panduan() {
    let bool = true;
    for (let i = 0; i < document.getElementsByClassName("zero").length; i++) {
        if (document.getElementsByClassName("zero")[i].value === "") {
            bool = true;
        } else {
            bool = false;
            break
        }
    }
    return bool
}

/**
 * 向服务器发送请求，是分页器中最重要的方法
 * @param start 起始位置
 * @return {Promise<number>}
 */
async function qingqiu(start) {
    let num = 0;
    await fetch("/server/orderall", {
        method: "POST",
        headers: {
            "Content-Type": "Application/x-www-form-urlencoded"
        },
        body: `start=${start}`
    })
        .then(value => value.json())
        .then(value1 => {
            Array.from(value1).forEach(v => {
                let bc = v["id"] % 2 === 0 ? 'odd' : 'even'
                $(".table").append(`
                        <tr class="td">
                        <td class="${bc}">${v["orderid"]}</td>
                        <td class="${bc}">${v["orderdate"]}</td>
                        <td class="${bc}">${v["linename"]}</td>
                        <td class="${bc}">${v["ywdb"]}</td>
                        <td class="${bc}">${v["number"]}</td>
                        <td class="${bc}">${v["unitprice"]}</td>
                        <td class="${bc}">${v["price"]}</td>
                        <td class="${bc}">${v["contact"]}</td>
                        <td class="${bc}">${v["phone"]}</td>
                        </tr>`)
                num = v["id"]
            })
        })
    return num;
}

/**
 * 表单清空
 */
function removeAllData() {
    $("#main button").attr("disabled", "disabled")
    $("#main input").val("")
    $("#je").val("0")
    $("#sl").val("0")
    $("#dj").val("0")
    $(".footer button").css({
            "cursor": "default",
            "background": "#9a9a9a",
            "color": "rgba(16, 16, 16, 0.3)"
        }
    )
}

/**
 * 显示内容
 */
function showData() {
    fetch("/server/order", {
        method: "POST",
        headers: {
            "Content-Type": "Application/x-www-form-urlencoded"
        },
        body: "orderid=" + $("#orderid").val()
    })
        .then(value => value.json())
        .then(value1 => {
            if (value1) {
                $("#orderid").val(value1["orderid"])
                $("#ywdb").val(value1["ywdb"])
                $("#je").val(value1["price"])
                $("#ddrq").val(value1["orderdate"])
                $("#sl").val(value1["number"])
                $("#lxr").val(value1["contact"])
                $("#xlmc").val(value1["linename"])
                $("#dj").val(value1["unitprice"])
                $("#lxdh").val(value1["phone"])
            } else {
                alert("请正确输入订单号")
            }

        })
}

/**
 * 删除数据
 */
function deleteDate() {
    sock = true;
    if (confirm("确定删除嘛")) {
        fetch("/server/deleteorder", {
            method: "POST",
            headers: {
                "Content-Type": "Application/x-www-form-urlencoded"
            },
            body: "orderid=" + $("#orderid").val()
        })
            .then(value => value.json())
            .then(value1 => {
                if (value1) {
                } else {
                    alert("请正确输入订单号")
                }

            })

    }

}

/**
 * 插入数据
 */
function insertData() {
    sock = true;
    let arr = "";
    arr += "orderid=" + $("#orderid").val() + "&"
    arr += "orderdate=" + $("#ddrq").val() + "&"
    arr += "linename=" + $("#xlmc").val() + "&"
    arr += "ywdb=" + $("#ywdb").val() + "&"
    arr += "number=" + $("#sl").val() + "&"
    arr += "unitprice=" + $("#dj").val() + "&"
    arr += "price=" + $("#dj").val() * $("#sl").val() + "&"
    arr += "contact=" + $("#lxr").val() + "&"
    arr += "phone=" + $("#lxdh").val()
    if ($("#orderid").val() != "" &&
        $("#ddrq").val() != "" &&
        $("#xlmc").val() != "" &&
        $("#ywdb").val() != "" &&
        $("#sl").val() != "" &&
        $("#dj").val() != "" &&
        $("#lxr").val() != "" &&
        $("#lxdh").val() != "") {
        fetch("/server/insertorder", {
            method: "POST",
            headers: {
                "Content-Type": "Application/x-www-form-urlencoded"
            },
            body: arr
        })
            .then(value => value.json())
            .then(value1 => {
                if (value1) {
                    alert("插入成功")
                } else {
                    alert("订单编号相同")
                }
            })
    } else {
        alert("请输入全部信息")
    }
}

/**
 * 更新数据
 */
function updateDate() {
    let sock = true;
    let arr = "";
    arr += "orderid=" + $("#orderid").val() + "&"
    arr += "orderdate=" + $("#ddrq").val() + "&"
    arr += "linename=" + $("#xlmc").val() + "&"
    arr += "ywdb=" + $("#ywdb").val() + "&"
    arr += "number=" + $("#sl").val() + "&"
    arr += "unitprice=" + $("#dj").val() + "&"
    arr += "price=" + $("#dj").val() * $("#sl").val() + "&"
    arr += "contact=" + $("#lxr").val() + "&"
    arr += "phone=" + $("#lxdh").val()
    if ($("#orderid").val() != "" &&
        $("#ddrq").val() != "" &&
        $("#xlmc").val() != "" &&
        $("#ywdb").val() != "" &&
        $("#sl").val() != "" &&
        $("#dj").val() != "" &&
        $("#lxr").val() != "" &&
        $("#lxdh").val() != "") {
        fetch("/server/updateorder", {
            method: "POST",
            headers: {
                "Content-Type": "Application/x-www-form-urlencoded"
            },
            body: arr
        })
            .then(value => value.json())
            .then(value1 => {
                if (value1) {
                    setTimeout(() => alert("修改成功"), 200)
                } else {
                    alert("修改失败")
                }
            })
    } else {
        alert("请输入全部信息")
    }
}

/**
 * 输入单价和数量后求和效果
 */
function sum() {
    $("#sl").keyup(() => {
        $("#je").val(($("#dj").val() * 100 * $("#sl").val() / 100).toFixed(2));
    })
    $("#dj").keyup(() => {
        $("#je").val(($("#dj").val() * 100 * $("#sl").val() / 100).toFixed(2));
    })
}

let value = "0";

/**
 * 表单输入内容验证
 * @param t
 */
function yanzheng(t) {
    t.value = /[^\d||\.]/.test(t.value) ? value : t.value;
    t.value = t.value === '' ? 0 : t.value
    t.value = (t.value.indexOf("0") === 0 && t.value.length > 1) ? t.value.substring(1) : t.value
    value = t.value === "" ? 0 : t.value;
}

/**
 * 分页系统
 * 已对用户操作进行防抖和节流处理
 */
function fenye() {
    let a;
    window.onscroll = function () {
        if (document.body.clientHeight - (window.innerHeight + document.documentElement.scrollTop) <= 200) {
            if (sock && scok_ajax) {
                clearTimeout(a);
                a = setTimeout(async () => {
                    scok_ajax = false
                    let aaa = await qingqiu(start)
                    if (aaa % 20 === 0) {
                        sock = true
                        start += 20
                    } else {
                        sock = false
                        start = aaa
                    }
                }, 200)
            }
        } else {
            clearTimeout(a);
            scok_ajax = true
        }
    }
}