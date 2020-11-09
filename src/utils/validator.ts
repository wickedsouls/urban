import {NextFunction, Request, Response} from "express";

export const validateParams = (keys: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const errors: string[] = [];
  keys.forEach((key) => {
    if (!req.query.hasOwnProperty(key)) {
      errors.push(key)
    }
  })
  if (errors.length > 0) return res.status(422).send(`Missing values: ${errors.join(',')}`)
  next()
}
