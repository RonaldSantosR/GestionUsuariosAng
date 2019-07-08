import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class RequesterService {

    headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {

    }

    request(url: string, method: string, body: {}, options: {}): Observable<HttpEvent<any>> {
        // options["headers"] = this.headers;
        return this.httpClient.request(new HttpRequest(method, url, body, options));
    }

    get<T>(url: string, options: {}): Observable<T> {
        // options["headers"] = this.headers;
        return this.httpClient.get<T>(url, options);
    }

    post<T>(url: string, body: any, options: {}): Observable<T> {
        // options["headers"] = this.headers;
        return this.httpClient.post<T>(url, body, options);
    }

    put<T>(url: string, body: any, options: {}): Observable<T> {
        // options["headers"] = this.headers;
        return this.httpClient.put<T>(url, body, options);
    }

    delete<T>(url: string, options: {}): Observable<T> {
        // options["headers"] = this.headers;
        return this.httpClient.delete<T>(url, options);
    }
}