import { Injectable, OnInit } from "@angular/core";
import { RequesterService } from "./requester.service";
import { Observable, Subject } from "rxjs";
import { AppSettings } from "./app.settings";
import { Dominio } from "../model/dominio.model";

@Injectable()
export class DominioService {

    REQUEST_URL = AppSettings.API_ENDPOINT + AppSettings.DOMINIO_URL;

    constructor(private requester: RequesterService ){
        this.listarDominiosActivos().subscribe(
            dominios => {
                this.dominiosActivos = dominios;
                this.dominiosChanged.next(this.dominiosActivos);
            }
        )
    }

    private dominiosActivos: Dominio[];
    
    getDominios(): Dominio[] {
        return this.dominiosActivos;
    }

    public dominiosChanged = new Subject<Dominio[]>();

    listarDominiosActivos(): Observable<Dominio[]>{
        return this.requester.get<Dominio[]>(this.REQUEST_URL + "activos", {});
    }

    // listarDominiosAll(): Observable<Dominio[]> {
    //     return this.requester.get<Dominio[]>(this.REQUEST_URL , {});
    // }


}