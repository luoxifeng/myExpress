/**
 * 为原生response 添加json等服务方法
 */

module.exports = function(){
    return function(req, res, next){
        res.json = function(json){
            let type = ({}).toString.call(json).replace(/\[object (.*)\]/, "$1");
            if (["Object", "Array"].includes(type)) {
                this.statusCode = 200;
                this.setHeader("Content-Type", "application/json");
                this.end(JSON.stringify(json));
            } else {
                throw new Error("the arguments must be a Object or a Array");
            }
        }

        res.notFound = function(message){
            this.statusCode = 404;
            this.setHeader("Content-Type", "application/json");
            this.end(JSON.stringify({
                statusCode: 404,
                message: message
            }));
        }
        next();
    }
}