import { Injectable } from "@angular/core";
import { AuthedApi } from "../authed-api";
import { FE_Upstream } from "../../models/admin-responses";
import { FE_TelegramBridge, FE_TelegramBridgeOptions } from "../../models/telegram";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AdminTelegramApiService extends AuthedApi {
    constructor(http: HttpClient) {
        super(http);
    }

    public getBridges(): Promise<FE_TelegramBridge[]> {
        return this.authedGet<FE_TelegramBridge[]>("/_dimension/api/v1/dimension/admin/telegram/all").toPromise();
    }

    public getBridge(bridgeId: number): Promise<FE_TelegramBridge> {
        return this.authedGet<FE_TelegramBridge>("/_dimension/api/v1/dimension/admin/telegram/" + bridgeId).toPromise();
    }

    public newFromUpstream(upstream: FE_Upstream): Promise<FE_TelegramBridge> {
        return this.authedPost<FE_TelegramBridge>("/_dimension/api/v1/dimension/admin/telegram/new/upstream", {upstreamId: upstream.id}).toPromise();
    }

    public newSelfhosted(provisionUrl: string, sharedSecret: string, options: FE_TelegramBridgeOptions): Promise<FE_TelegramBridge> {
        return this.authedPost<FE_TelegramBridge>("/_dimension/api/v1/dimension/admin/telegram/new/selfhosted", {
            provisionUrl: provisionUrl,
            sharedSecret: sharedSecret,
            options: options,
        }).toPromise();
    }

    public updateSelfhosted(bridgeId: number, provisionUrl: string, sharedSecret: string, options: FE_TelegramBridgeOptions): Promise<FE_TelegramBridge> {
        return this.authedPost<FE_TelegramBridge>("/_dimension/api/v1/dimension/admin/telegram/" + bridgeId, {
            provisionUrl: provisionUrl,
            sharedSecret: sharedSecret,
            options: options,
        }).toPromise();
    }
}
