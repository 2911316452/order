function order(req, res) {
    res.render('order', {title: "系统登陆"});
}

function message(req, res) {
    res.render('message');
}

function customer(req, res) {
    res.render('customer');
}


module.exports = {
    order,
    customer,
    message
}