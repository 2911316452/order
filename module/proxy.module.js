let request = require('request');

/**
 * 请求转发
 * @param opitons 配置项
 * @return {Promise<unknown>}
 */
function to(opitons) {
    return new Promise((resolve, reject) => {
        request(opitons, (err, httpres, body) => {
            if (err) {
                reject(err)
            } else {
                resolve({httpres, body})
            }
        })
    })
}

module.exports = {
    to
};