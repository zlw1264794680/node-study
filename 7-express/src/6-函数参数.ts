import { Request, Response, NextFunction } from 'express';

// 示例函数
function standardMiddleware(req: Request, res: Response, next: NextFunction) {
    // ...
}

function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    // ...
}

function simpleFunction(a: any, b: any): void {
    // ...
}

function functionWithDefaults(a:any, b = 1, c:any) {
    // length 是 1 (只计算到第一个默认参数之前的参数)
}

function functionWithRest(a:any, ...rest:any[]) {
    // length 是 1 (不计算剩余参数)
}

// 打印函数的 length 属性
console.log('standardMiddleware参数：', standardMiddleware.length); // 输出: 3
console.log('errorHandlerMiddleware参数：', errorHandlerMiddleware.length); // 输出: 4
console.log('simpleFunction参数：', simpleFunction.length); // 输出: 2

/**
 * ts编译："target":"es6"，length 是 1 (只计算到第一个默认参数之前的参数)
 * ts编译："target":"es5"，length 是 3（因为没有默认参数）
 */
console.log('functionWithDefaults参数：', functionWithDefaults.length); 

console.log('functionWithRest参数：', functionWithRest.length); // 输出: 1