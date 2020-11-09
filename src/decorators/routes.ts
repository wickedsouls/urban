import 'reflect-metadata';
import {Methods, Metadata} from "../utils";

export const routeBinder = (method:Methods)=>{
  return (path: string) => {
    return function (target: any, key: string) {
      Reflect.defineMetadata(Metadata.path, path, target, key)
      Reflect.defineMetadata(Metadata.method, method, target, key)
    }
  }
}

export const Get = routeBinder(Methods.get);
export const Post = routeBinder(Methods.post);
export const Del = routeBinder(Methods.delete);
export const Put = routeBinder(Methods.put);
