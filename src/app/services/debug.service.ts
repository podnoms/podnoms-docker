import { AuthHttp } from 'angular2-jwt';
import { HubConnection } from '@aspnet/signalr-client';
import { Injectable } from '@angular/core';


@Injectable()
export class DebugService {


    constructor(private _http: AuthHttp) { }

    sendRealtime(message: string): any {
        return this._http.post('api/debug/realtime', JSON.stringify(message));
    }
}