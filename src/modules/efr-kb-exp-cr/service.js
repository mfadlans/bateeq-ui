import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const serviceUri = 'docs/efr-kb-exp';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getExpeditionServices() {
    return new Promise((resolve, reject) => {
      var config = Container.instance.get(Config);
      var endpoint = config.getEndpoint("master").client.baseUrl + 'expedition-service-routers/all';
      super.get(endpoint).then(result => resolve(result));
    });
  }

  getModuleConfig() {
    // var endpoint = require('../../host').core + '/modules?keyword=EFR-KB/EXB';
    return super.get(endpoint)
      .then(results => {
        if (results && results.length == 1)
          return Promise.resolve(results[0].config);
        else
          return Promise.resolve(null);
      });
  }

  getStorageById(id) {
    // var endpoint = `${require('../../host').inventory + '/storages'}/${id}`;
    return super.get(endpoint);
  }

  getStock(storageId, itemId) {
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("inventory").client.baseUrl + 'storages/' + storageId + "/inventories/" + itemId;
    return super.get(endpoint);
  }

}