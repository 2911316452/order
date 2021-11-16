let proxy = require("../module/proxy.module");
const tool = require("../module/tool.module");


function enroll(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/enroll.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function login(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/login.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => {
        if (value.body) {
            req.session.user = {
                name: req.body.name,
                password: req.body.password
            }
            res.end(value.body)
        } else {
            res.end(false)
        }
    })
}

function orderall(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/orderall.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function order(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/order.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function deleteorder(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/deleteorder.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function insertorder(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/insertorder.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function updateorder(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/updateorder.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded;charset=utf-8"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function selectmessage(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/selectmessage.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function updatemessage(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/updatemessage.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function insertcustomer(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/insertcustomer.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function updatecustomer(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/updatecustomer.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function selectcustomer(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/selectcustomer.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

function deletecustomer(req, res) {
    return proxy.to({
        url: 'http://127.0.0.1:3000/server/deletecustomer.php',
        method: "post",
        headers: {
            "Content-type": "Application/x-www-form-urlencoded"
        },
        body: tool.Serialization(req.body)
    }).then(value => res.end(value.body))
}

module.exports = {
    enroll,
    login,
    orderall,
    order,
    deleteorder,
    insertorder,
    updateorder,
    selectmessage,
    updatemessage,
    insertcustomer,
    updatecustomer,
    selectcustomer,
    deletecustomer

}