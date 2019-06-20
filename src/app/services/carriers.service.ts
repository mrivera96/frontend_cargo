import {Injectable} from '@angular/core';
import {Carrier} from "../interfaces/carriers";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarriersService {
  API_ENDPOINT = "/api_cargo/public/api";


  HEADERS = new HttpHeaders({"CONTENT-TYPE": "application/json", "Access-Control-Allow-Origin": "*"});

  constructor(private httpClient: HttpClient) {
  }

  get(estDest, estOrg) {
    let params = new HttpParams().set('OState', estOrg).set('DState', estDest);
    return this.httpClient.get(this.API_ENDPOINT + "/getRoutes", {params: params});

  }

  show(ID) {
    let params = new HttpParams().set('ID', ID);
    return this.httpClient.get(this.API_ENDPOINT + "/getRoutes", {params: params});
  }

  put(carrier: Carrier) {
    const headers = new HttpHeaders({"CONTENT-TYPE": "application/json", "Access-Control-Allow-Origin": "*"});

    return this.httpClient.put(this.API_ENDPOINT + "/updateRoute" , carrier,{headers:headers} );
  }

  save(carrier: Carrier) {
    const headers = new HttpHeaders({"CONTENT-TYPE": "application/json", "Access-Control-Allow-Origin": "*"});

    return this.httpClient.post(this.API_ENDPOINT + "/createRoute" , carrier,{headers:headers} );
  }


}
