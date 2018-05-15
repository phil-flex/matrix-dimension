import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Appservice } from "../../models/admin-responses";

@Injectable()
export class AdminAppserviceApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getAppservices(): Promise<FE_Appservice[]> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/appservices/all").map(r => r.json()).toPromise();
    }

    public getAppservice(appserviceId: string): Promise<FE_Appservice> {
        return this.authedGet("/_dimension/api/v1/dimension/admin/appservices/" + appserviceId).map(r => r.json()).toPromise();
    }

    public createAppservice(userPrefix: string): Promise<FE_Appservice> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/appservices/new", {userPrefix: userPrefix}).map(r => r.json()).toPromise();
    }

    public test(appserviceId: string): Promise<any> {
        return this.authedPost("/_dimension/api/v1/dimension/admin/appservices/" + appserviceId + "/test").map(r => r.json()).toPromise();
    }
}
