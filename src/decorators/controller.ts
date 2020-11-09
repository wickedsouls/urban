import 'reflect-metadata';
import {Metadata, Methods, Router, validateParams} from "../utils/";
import {RequestHandler} from "express";

export const Controller = (prefix: string) => {
  const router = Router.getInstance();
  const middlewares:RequestHandler[] = [];

  return function (target: any) {
    for (let key in target.prototype) {
      const path = Reflect.getMetadata(Metadata.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(Metadata.method, target.prototype, key);
      const params = Reflect.getMetadata(Metadata.validator, target.prototype, key);
      if (params) middlewares.push(validateParams(params))
      const middleware = Reflect.getMetadata(Metadata.use, target.prototype, key);
      if (middleware) middlewares.push(middleware)
      if (path) {
        router[method](prefix + path, ...middlewares, target.prototype[key])
      }
    }
  }
}


