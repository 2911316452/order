$(() => {
    main();
    value();
})

function main() {
    /*
    * 注册动画
    * */
    setTimeout(() => {
        $(".left h2").attr("class", "o2")
    }, 300)
    setTimeout(() => {
        $(".left p").eq(0).attr("class", "o2")
        $(".middle").attr("class", "middle o5")
    }, 700)
    setTimeout(() => {
        $(".left p").eq(1).attr("class", "o2")
    }, 750)
    setTimeout(() => {
        $(".left p").eq(2).attr("class", "o2")
    }, 800)
    setTimeout(() => {
        $(".left p").eq(3).attr("class", "o2")
    }, 850)
    setTimeout(() => {
        $(".right h2").attr("class", "o1")
    }, 300)
    setTimeout(() => {
        $(".right .items").eq(0).attr("class", "items o3")
    }, 300)
    setTimeout(() => {
        $(".right .items").eq(1).attr("class", "items o3")
    }, 350)
    setTimeout(() => {
        $(".right .items").eq(2).attr("class", "items o3")
    }, 400)
    setTimeout(() => {
        $(".bt").attr("class", "bt o4")
    }, 900)
    setTimeout(() => {
        $(".bottom_body").css("animation", "o1 300ms ease-in-out forwards")
    }, 200)
}

function insertDate() {
    if ($("#text1").val() === "" || $("#text2").val() === "" || $("#text3").val() === "") {
        alert("请填写全部信息")
    } else {
        let arr = "name=" + $("#text1").val() + "&phone=" + $("#text2").val() + "&address=" + $("#text3").val()
        fetch("/server/insertcustomer", {
            method: "POST",
            headers: {
                "Content-Type": "Application/x-www-form-urlencoded"
            },
            body: arr
        })
            .then(value => value.json())
            .then(value => {
                if (value) {
                    alert("提交成功")
                } else {
                    let a = confirm("该用户已经存在信息，是否修改")
                    if (a) {
                        fetch("/server/updatecustomer", {
                            method: "POST",
                            headers: {
                                "Content-Type": "Application/x-www-form-urlencoded"
                            },
                            body: arr
                        })
                            .then(value => value.json())
                            .then(value1 => {
                                if (value1) {
                                    alert("修改成功")
                                } else {
                                    alert("修改失败")
                                }
                            })
                    }
                }
            })
    }

}

function value() {
    fetch("/server/selectcustomer", {method: "POST"})
        .then(value => value.json())
        .then(value1 => {
            if (value1.length != 0) {
                value1.forEach(value => {
                    $(".tabled").append(
                        `
                    <tr class="td">
                <td>${value["name"]}</td>
                <td>${value["phone"]}</td>
                <td>${value["address"]}</td>
                <td class="del" onclick="deleteDate('${value["name"]}')">删除</td>
                </tr>
                    `
                    )
                })

            } else {
                setTimeout(() => {
                    alert("没有数据哦")
                }, 1300)
            }

        })
}

function deleteDate(name) {
    console.log(name)
    fetch("/server/deletecustomer", {
        method: "POST",
        headers: {
            "Content-Type": "Application/x-www-form-urlencoded"
        },
        body: "name=" + name
    })
        .then(value => value.json())
        .then(value1 => {
            if (value1) {
                alert("删除成功")
                $(".td").remove()
                value()
            } else {
                alert("删除失败")
            }
        })
}