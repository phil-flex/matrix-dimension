import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Upstream } from "../../models/admin-responses";

@Injectable()
export class AdminUpstreamApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getUpstreams(): Promise<FE_Upstream[]> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/upstreams/all").map(r => r.json()).toPromise();
    }

    public newUpstream(name: string, type: string, scalarUrl: string, apiUrl: string): Promise<FE_Upstream> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/upstreams/new", {
            name: name,
            type: type,
            scalarUrl: scalarUrl,
            apiUrl: apiUrl,
        }).map(r => r.json()).toPromise();
    }
}
