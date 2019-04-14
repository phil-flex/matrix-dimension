import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Upstream } from "../../models/admin-responses";
import { FE_TelegramBridge, FE_TelegramBridgeOptions } from "../../models/telegram";
import { map } from "rxjs/operators";

@Injectable()
export class AdminTelegramApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getBridges(): Promise<FE_TelegramBridge[]> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/telegram/all")
            .pipe(map(r => r.json())).toPromise();
    }

    public getBridge(bridgeId: number): Promise<FE_TelegramBridge> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/telegram/" + bridgeId)
            .pipe(map(r => r.json())).toPromise();
    }

    public newFromUpstream(upstream: FE_Upstream): Promise<FE_TelegramBridge> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/telegram/new/upstream", {upstreamId: upstream.id})
            .pipe(map(r => r.json())).toPromise();
    }

    public newSelfhosted(provisionUrl: string, sharedSecret: string, options: FE_TelegramBridgeOptions): Promise<FE_TelegramBridge> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/telegram/new/selfhosted", {
            provisionUrl: provisionUrl,
            sharedSecret: sharedSecret,
            options: options,
        }).pipe(map(r => r.json())).toPromise();
    }

    public updateSelfhosted(bridgeId: number, provisionUrl: string, sharedSecret: string, options: FE_TelegramBridgeOptions): Promise<FE_TelegramBridge> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/telegram/" + bridgeId, {
            provisionUrl: provisionUrl,
            sharedSecret: sharedSecret,
            options: options,
        }).pipe(map(r => r.json())).toPromise();
    }
}
