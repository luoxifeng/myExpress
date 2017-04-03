/**
 * 应用服务
 */
const SERVER_PORT = 2010;

const express = require("./framework/myexpress");
const app = express();
const parserReq = require("./middleware/parserReq");
const parserRes = require("./middleware/parserRes");
const summary = require("./summary/")();

//配置解析器，解析请求参数以及请求体
app.use(parserReq())

//为response 添加语法糖方法
app.use(parserRes())

app.use(function(req, res, next){
    console.log("请求进入");
    next();
})

//应用层级的路由
app.use("/", function(req, res, next){
    console.log("首页");
    res.json({
        page: "index",
        desc: "首页",
        query: req.query,
        summary: summary
    })
})

app.get("/index", function(req, res, next){
    console.log("列表页");
    res.json({
        page: "index",
        desc: "首页",
        query: req.query,
        summary: summary
    })
})

app.get("/list", function(req, res, next){
    console.log("列表页");
    res.json({
        page: "list",
        desc: "列表页",
        query: req.query,
        summary: summary
    })
})


/**
 * 路由层级的路由
 */
let router1 = express.Router();
router1.use("/router/index", function(req, res, next){
    console.log("/roter/index")
    res.json({
        k:1111
    })
})
app.use(router1);


//串行特定路由路由
let router2 = express.Router();
router2.route("/router")
.get("/get", function(req, res, next){
    res.json({
        desc: "这是路由层的get的请求"
    })
})
.post("/post", function(req, res, next){
    res.json({
        desc: "这是路由层的post的请求"
    })
})
app.use(router2);

//映射所有类型
let router3 = express.Router();
router3.all("/router/all", function(req, res, next){
    res.json({
        desc: "这是映射所有类型"
    })
})
app.use(router3);

//不带有嵌套的路由
let router4 = express.Router();
router4.get("/get", function(req, res, next){
    res.json({
        desc: "这是不带有嵌套的路由get的请求"
    })
})
.post("/post", function(req, res, next){
    res.json({
        desc: "这是不带有嵌套的路由post的请求"
    })
})
app.use(router4);






//404
app.use(function(req, res, next){
    res.notFound("未找到你要的网页");
})


//listen
app.listen(SERVER_PORT, () => {
    console.log(`server start at port: ${SERVER_PORT}`)
});


