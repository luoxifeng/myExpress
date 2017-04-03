/**
 * 简单的node封装
 */

const http = require("http");
const _ = require("../util/util");
const Router = require("./router");
//middleware 中间件列表
let _middlewares = [];

//loop middleware 循环遍历中间件
function nextWapper(req, res) {
    let i = 0;
    function next() {
        _middlewares[i++](req, res, next)
    }
    next();
}

function express() {
    let app = {};

    //register middleware 注册中间件
    app.use = function(path, callback) {
        let self = this;
        if (_.isFunction(path)){
            _middlewares.push(path);
        } else if (_.isString(path) && _.isFunction(callback)){
            _middlewares.push(function(req, res, next){
                if(_.comparePath(req.path, path)){
                    callback(req, res, next);
                } else {
                   next(); 
                }
            })
        } else {
            throw new Error("this use function must be accept arguments \
            like app.use(function) or app.use(str, function)");
        }
    }

    //listen 监听端口以及回调
    app.listen = function(port, callback) {
        let self = this;
        //中间件
        let middleware;
        let server = http.createServer((req, res) => {
            req.path = req.url.replace(/(\/.*?)(\?.*)/, "$1")
            nextWapper(req, res);
        });
        server.listen(port, callback)
    }

    const mappingRequest = method => {
        method = method.toLowerCase();
        return function(path, callback) {
            if (_.isString(path) && _.isFunction(callback)) {
                _middlewares.push(function (req, res, next) {
                    if (req.method.toLowerCase() === method && _.comparePath(req.path, path)) {
                        callback(req, res, next)
                    } else {
                        next();
                    }
                })
            } else {
                throw new Error(`app.${method} must be used like app.${method}(str, function)`)
            }
        }
    }
    //映射get请求 get request
    app.get = mappingRequest("Get");

    //映射post请求 post request
    app.post = mappingRequest("Post");


    return app;
}

//路由
express.Router = Router

module.exports = express;

