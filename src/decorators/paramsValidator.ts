import 'reflect-metadata';
import {Metadata} from "../utils";

export const ValidateParams = (...keys: string[]) => {
  return (target: any, key: string) => {
    Reflect.defineMetadata(Metadata.validator, keys, target, key)
  }
}
