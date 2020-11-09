import {Request, Response} from "express";
import {Get, Use, Controller, ValidateParams} from '../decorators';
import {geoLocation} from "..";
import {RedisServer} from '../services/RedisServer';

export const redisServer = new RedisServer('redis://127.0.0.1:6379')

@Controller('/api')
class DistrictController {

  @Get('/district')
  @Use(redisServer.serveFromCache)
  @ValidateParams('address')
  getDistrict(req: Request, res: Response) {
    const address = req.query.address as string;

    geoLocation.findLocation(address).then((location) => {
      const {lat, lng} = location
      const foundDistrict = geoLocation.findDistrict([lat, lng]);
      if (foundDistrict) {
        const response = {
          status: "OK",
          search: address,
          location
        }
        redisServer.saveToCache(address, response)
        return res.json(response)
      }else{
        const response = {
          status: "NOT_FOUND",
          search: "Non-existing address",
        }
        redisServer.saveToCache(address, response)
        return res.json()
      }

    }).catch(() => {
      return res.status(400).send('Unable to get coordinates')
    })
  }
}
