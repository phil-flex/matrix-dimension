import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Appservice, FE_NebConfiguration, FE_Upstream } from "../../models/admin-responses";

@Injectable()
export class AdminNebApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getConfigurations(): Promise<FE_NebConfiguration[]> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/neb/all").map(r => r.json()).toPromise();
    }

    public getConfiguration(nebId: number): Promise<FE_NebConfiguration> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/neb/" + nebId + "/config").map(r => r.json()).toPromise();
    }

    public newUpstreamConfiguration(upstream: FE_Upstream): Promise<FE_NebConfiguration> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/neb/new/upstream", {upstreamId: upstream.id}).map(r => r.json()).toPromise();
    }

    public newAppserviceConfiguration(adminUrl: string, appservice: FE_Appservice): Promise<FE_NebConfiguration> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/neb/new/appservice", {
            adminUrl: adminUrl,
            appserviceId: appservice.id
        }).map(r => r.json()).toPromise();
    }

    public toggleIntegration(nebId: number, integrationType: string, setEnabled: boolean): Promise<any> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/neb/" + nebId + "/integration/" + integrationType + "/enabled", {enabled: setEnabled}).map(r => r.json()).toPromise();
    }

    public setIntegrationConfiguration(nebId: number, integrationType: string, configuration: any): Promise<any> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/neb/" + nebId + "/integration/" + integrationType + "/config", configuration).map(r => r.json()).toPromise();
    }

    public getIntegrationConfiguration(nebId: number, integrationType: string): Promise<any> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/neb/" + nebId + "/integration/" + integrationType + "/config").map(r => r.json()).toPromise();
    }
}
