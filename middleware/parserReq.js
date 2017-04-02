/**
 * 解析request 参数
 */

module.exports = function(opt){
    return function(req, res, next){
        req.query = parseQuery(req);
        if(opt && opt.bosyParser === true){
            req.body = parseBody(req);
        }
        next();
    }
}


//解析地址栏查询参数
function parseQuery(req){
    let queryStr = req.url.replace(/(\/.*?\?)/, "");
    let query = {};
    if (queryStr) {
        let kv = [];
        queryStr.split(/&/).forEach(str => {
            kv = str.split("=");
            kv[1] &&　(query[kv[0]] = kv[1]);
        })
    }
    return query;
}


//解析请求体
function parseBody(req){
    let body = {};
    return body;
}
