import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Widget } from "../../models/integration";
import { IntegrationsApiService } from "./integrations-api.service";

@Injectable()
export class WidgetApiService extends AuthedApi {
    constructor(http: Http, private integrationsApi: IntegrationsApiService) {
        super(http);
    }

    public getWidget(type: string): Promise<FE_Widget> {
        return this.integrationsApi.getIntegration("widget", type).then(i => <FE_Widget>i);
    }

    public isEmbeddable(url: string): Promise<any> { // 200 = success, anything else = error
        return this.http.get("/_dimension/api/v1/dimension/widgets/embeddable", {params: {url: url}})
            .map(r => r.json()).toPromise();
    }
}
