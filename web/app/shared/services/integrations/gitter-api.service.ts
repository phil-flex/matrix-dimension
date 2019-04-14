import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_GitterLink } from "../../models/gitter";
import { map } from 'rxjs/operators';

@Injectable()
export class GitterApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public bridgeRoom(roomId: string, gitterRoomName: string): Promise<FE_GitterLink> {
        return this.authedPost("/_dimension/api/v1/dimension/gitter/room/" + roomId + "/link", {gitterRoomName})
            .pipe(map(r => r.json())).toPromise();
    }

    public unbridgeRoom(roomId: string): Promise<any> {
        return this.authedDelete("/_dimension/api/v1/dimension/gitter/room/" + roomId + "/link")
            .pipe(map(r => r.json())).toPromise();
    }

    public getLink(roomId: string): Promise<FE_GitterLink> {
        return this.authedGet("/_dimension/api/v1/dimension/gitter/room/" + roomId + "/link")
            .pipe(map(r => r.json())).toPromise();
    }
}