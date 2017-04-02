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


//404
app.use(function(req, res, next){
    res.notFound("未找到你要的网页");
})


//listen
app.listen(SERVER_PORT, () => {
    console.log(`server start at port: ${SERVER_PORT}`)
});


