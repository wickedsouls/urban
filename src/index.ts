import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import './controllers/DistrictController';
import {Router} from './utils';
import {GeoLocation} from './services/GeoLocation';
import {GoogleProvider} from './services/GoogleProvider';
dotenv.config({path:path.resolve(__dirname +'/../.env')})

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GOOGLE_API_KEY;
if(!API_KEY){
  console.log('Missing API_KEY')
  process.exit()
}

const app = express();

// Load data from file and assign GeoLocation Provider
export const geoLocation = new GeoLocation('formatted-districts.json', new GoogleProvider(API_KEY));
geoLocation.loadData();

// Setup express
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(Router.getInstance());

console.log('envs', API_KEY, PORT)

// Start app
app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})
