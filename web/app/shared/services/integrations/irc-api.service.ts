import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";

@Injectable()
export class IrcApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getOperators(networkId: string, channelNoHash: string): Promise<string[]> {
        return this.authedGet("/_dimension/api/v1/dimension/irc/" + networkId + "/channel/" + channelNoHash + "/ops").map(r => r.json()).toPromise();
    }

    public requestLink(roomId: string, networkId: string, channelNoHash: string, op: string): Promise<any> {
        return this.authedPost("/_dimension/api/v1/dimension/irc/" + networkId + "/channel/" + channelNoHash + "/link/" + roomId, {op: op}).map(r => r.json()).toPromise();
    }

    public removeLink(roomId: string, networkId: string, channelNoHash: string): Promise<any> {
        return this.authedPost("/_dimension/api/v1/dimension/irc/" + networkId + "/channel/" + channelNoHash + "/unlink/" + roomId).map(r => r.json()).toPromise();
    }
}
