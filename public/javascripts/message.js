$(() => {
    main();
})

async function main() {
    await fetch("/server/selectmessage", {method: "POST"})
        .then(value => value.json())
        .then(value => {
            if (value != 0) {
                value.forEach(value => {
                    $("body").append(`
                <div id="plane" class="d">
    <img src="../images/taiyang.gif" alt="" class="taiyang p">
    <img src="../images/yun1.png" alt="" class="yun1 p">
    <img src="../images/yun2.png" alt="" class="yun2 p">
    <div class="top">
        <img src="../images/god.jpeg" alt="头像">
        <div class="right">
            <p class="nc">${value["name"]}</p>
            <time>${value["time"]}</time>
        </div>
    </div>
    <div class="middle">
        <p>${value["say"]}</p>
    </div>
    <div class="bottom">
        <p>
            <button onclick="zanup(this,${value['id']})" onmouseover="over(this)" onmouseleave="leave(this)"><i class="iconfont">&#xe63e;</i>赞</button>
            <span class="num">${value["zan"]}</span></p>
        <button onclick="huifu(this)"><i class="iconfont">&#xe655;</i>回复</button>
    </div>
    <div class="ly">
        <div class="ly_text">
            <textarea name="textarea" id="textarea" cols="30" rows="10" placeholder="请回复"></textarea>
        </div>
    </div>
</div>
                `)
                })
            } else {
                alert("没有数据哦")
            }
        })
    donghua();
    hf_hf();

}

function huifu(t) {
    if ($(t).parent().siblings(".ly").children(".ly_text").css("height") != "86px") {
        $(t).parent().siblings(".ly").children(".ly_text").css("height", "86px");
        bool = false;
    } else {
        $(t).parent().siblings(".ly").children(".ly_text").css("height", "1px");
        bool = true;
    }
}

function hf_hf() {
    $(".vakue p").mouseenter(() => {
        $(".hf_hf").css("opacity", "1")
    }).mouseleave(() => {
        $(".hf_hf").css("opacity", "0")
    })

}

function donghua() {
    for (let i = 0; i < $(".d").length; i++) {
        setTimeout(function () {
            $(".d").eq(0).attr("class", "o1")
        }, 100 * i)
    }
}

let dsa = true;

function zanup(t, id) {
    let add;
    if (dsa) {
        add = parseInt($(t).parent().children(".num").html()) + 1
        $(t).children("i").css("color", "#0affff")
        dsa = false
    } else {
        add = parseInt($(t).parent().children(".num").html()) - 1
        $(t).children("i").css("color", "#000")
        dsa = true
    }
    console.log(add)
    fetch("/server/updatemessage", {
        method: "POST",
        headers: {
            "Content-Type": "Application/x-www-form-urlencoded"
        },
        body: "id=" + id + "&zan=" + add

    })
        .then(value => value.json())
        .then(value => {
            if (value) {
                $(t).parent().children(".num").html(add);
            } else {
                alert("赞失败")
            }
        })
}

function over(t) {
    $(t).children("i").css("color", "#0affff");
}

function leave(t) {
    if (dsa) {
        $(t).children("i").css("color", "#000");
    }
}