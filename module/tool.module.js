/**
 * 序列化函数，将request请求参数取出
 * @param obj 请求头数据
 * @return {*}
 */
function Serialization(obj) {
    let arr = "";
    for (let i in JSON.parse(JSON.stringify(obj))) {
        arr += i + "=" + obj[i] + "&"
    }
    return arr.slice(0, arr.length - 1)
}

/**
 * Interceptor拦截器
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function Interceptor(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect(302, "http://127.0.0.1")
    }
}

module.exports = {
    Serialization,
    Interceptor
}