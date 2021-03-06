import { Injectable } from "@angular/core";
import { AuthedApi } from "../authed-api";
import { FE_Upstream } from "../../models/admin-responses";
import { FE_GitterBridge } from "../../models/gitter";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AdminGitterApiService extends AuthedApi {
    constructor(http: HttpClient) {
        super(http);
    }

    public getBridges(): Promise<FE_GitterBridge[]> {
        return this.authedGet<FE_GitterBridge[]>("/_dimension/api/v1/dimension/admin/gitter/all").toPromise();
    }

    public getBridge(bridgeId: number): Promise<FE_GitterBridge> {
        return this.authedGet<FE_GitterBridge>("/_dimension/api/v1/dimension/admin/gitter/" + bridgeId).toPromise();
    }

    public newFromUpstream(upstream: FE_Upstream): Promise<FE_GitterBridge> {
        return this.authedPost<FE_GitterBridge>("/_dimension/api/v1/dimension/admin/gitter/new/upstream", {upstreamId: upstream.id}).toPromise();
    }

    public newSelfhosted(provisionUrl: string): Promise<FE_GitterBridge> {
        return this.authedPost<FE_GitterBridge>("/_dimension/api/v1/dimension/admin/gitter/new/selfhosted", {
            provisionUrl: provisionUrl,
        }).toPromise();
    }

    public updateSelfhosted(bridgeId: number, provisionUrl: string): Promise<FE_GitterBridge> {
        return this.authedPost<FE_GitterBridge>("/_dimension/api/v1/dimension/admin/gitter/" + bridgeId, {
            provisionUrl: provisionUrl,
        }).toPromise();
    }
}
