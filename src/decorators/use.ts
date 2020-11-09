import 'reflect-metadata';
import {Metadata} from '../utils';
import {RequestHandler} from 'express';

export const Use = (middleware: RequestHandler) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(Metadata.use, middleware, target, key)
  }
}

