/**
 * 一些辅助工具函数集
 */

let _ = exports;


//isString
_.isString = str => typeof str === "string";


//isFunction
_.isFunction = fn => typeof fn === "function";

//compare path
_.comparePath = (path1, path2) => path1.replace(/\\/g, "/") === path2.replace(/\\/g, "/");
