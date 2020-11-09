import express from 'express';

export class Router {
  private static instance: express.Router;

  static getInstance() {
    if (!Router.instance) {
      Router.instance = express.Router()
    }
    return this.instance;
  }
}
