import fs from 'fs';
import path from "path";
import inside from 'point-in-polygon';
import {Coordinate, District, Location} from '../utils/types';

interface Provider {
  findLocation: (address: string) => Promise<Location>
}

export class GeoLocation {
  private data?: District;

  constructor(private fileName: string, public provider: Provider) {
  }

  loadData() {
    const data = fs.readFileSync(path.resolve(__dirname + '/../../' + this.fileName), 'utf-8')
    this.data = JSON.parse(data) as District
  }

  findLocation = (address: string) => this.provider.findLocation(address)

  findDistrict(coordinate: Coordinate): boolean {
    // Look for polygon
    let match = false;
    this.data?.features.forEach((feature) => {
      if (inside([coordinate[1], coordinate[0]], feature.geometry.coordinates[0])) {
        match = true
      }
    })
    return match
  }
}
