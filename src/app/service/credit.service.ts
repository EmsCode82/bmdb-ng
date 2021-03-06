import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { Credit } from '../model/credit.class';

const url:string = "http://localhost:8080/credits/";

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  
  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<JsonResponse> {
    return this.http.get(url) as Observable<JsonResponse>;
  }

  create(credit: Credit): Observable<JsonResponse> {
    return this.http.post(url, credit) as Observable<JsonResponse>;
  }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;
  }

  edit(credit: Credit): Observable<JsonResponse> {
    return this.http.put(url, credit) as Observable<JsonResponse>;
  }

  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;
  }

  getAllMoviesForActor(id: number): Observable<JsonResponse> {
    return this.http.get(url+"/filmography/"+id) as Observable<JsonResponse>;
  }

  getAllActorsForMovie(id: number): Observable<JsonResponse> {
    return this.http.get(url+"/credits/"+id) as Observable<JsonResponse>;
  }
}