import axios from "axios";
import {Location} from '../utils/types';


interface Results {
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  }
  address_components: AddressComponent[];
  formatted_address: string;
}

interface AddressComponent {
  long_name: string,
  short_name: string,
  types: string[];
}

interface GoogleResponse {
  results: Results[]
}

export class GoogleProvider {
  constructor(private API_KEY: string) {
  }

  findLocation = async (address: string): Promise<Location> => {
    const {data} = await axios.get<GoogleResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.API_KEY}`)
    const {lat, lng} = data.results[0].geometry.location;

    let city = '';
    let serviceArea = '';
    let postcode = '';
    data.results[0].address_components.forEach((component) => {
      if (component.types.includes('postal_town')) city = component.long_name;
      if (component.types.includes('country')) serviceArea = component.long_name;
      if (component.types.includes('postal_code')) postcode = component.long_name;
    })

    return {
      address: data.results[0].formatted_address,
      city,
      lat,
      lng,
      serviceArea,
      postcode,
    }
  }
}
