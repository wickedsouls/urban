import redis, {RedisClient} from 'redis';
import {NextFunction, Request, Response} from "express";

export class RedisServer {
  public client: RedisClient

  constructor(private url: string) {
    this.client = redis.createClient(url)
  }

  serveFromCache=(req: Request, res: Response, next: NextFunction) =>{
    const address = req.query.address as string;
    this.client.get(address, (err, location) => {
      if (location) {
        console.log('Serving from cache')
        return res.json(JSON.parse(location))
      }
      next()
    })
  }

  saveToCache(search: string, location: Object) {
    this.client.set(search, JSON.stringify(location), () => {
      console.log('Saved to cache')
    })
  }
}
