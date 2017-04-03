/**
 *  路由
 */
const _ = require("../util/util");
const path = require("path");

let Router = function(options){

    function router(req, res, next){
        router.handle(req, res, next)
    }
    router.__proto__ = Router;
    router.stack = [];
    return router;

}

Router.rootPath = "/";

/**
 * 可接收两个参数 第一个参数是路径， 第二个参数是回调
 * 也可接受一个参数 但必须是函数回调
 */
Router.use = function(fn){
    var self = this;
    var offset = 0;//通过偏移量的值来判断是否是两个参数，以及判断参数是否合法
    var _path = "/";
    if(!_.isFunction(fn)){
        offset = 1;
        _path = fn;
    } 
    var callbacks = ([]).slice.call(arguments, offset);
    if(callbacks.length == 0) {
        throw new TypeError('Router.use() requires middleware functions');
    }
    let callback = callbacks[0];
    self.stack.push({
        method: "all",
        path: path.join(self.rootPath, _path),
        handle: offset ? callback : fn
    });
    return this;
}

Router.all = function(_path, fn){
    this.stack.push({
        method: "all",
        path: path.join(this.rootPath, _path),
        handle: fn
    });
    return this;
}

Router.route = function(path){
    this.rootPath = path;
    return this;
}

Router.get = function(_path, fn){
    this.stack.push({
        method: "get",
        path: path.join(this.rootPath, _path),
        handle: fn
    });
    return this;
}

Router.post = function(_path, fn){
    this.stack.push({
        method: "post",
        path: path.join(this.rootPath, _path),
        handle: fn
    });
    return this;
}

Router.handle = function(req, res, next){
    let layer = this.stack.find(layer => {
        var flag1 =  _.comparePath(layer.path, req.path);
        var flag2 = true;
        if(layer.method !== "all"){
            flag2 = layer.method.toLowerCase() == req.method.toLowerCase();
        }
        return flag1 && flag2;
         
    });
    if (layer) {
        layer.handle(req, res, next);
    } else {
        next();
    }

}


module.exports = Router;
