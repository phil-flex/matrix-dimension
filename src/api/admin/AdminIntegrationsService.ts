import { GET, Path, PathParam, POST, QueryParam } from "typescript-rest";
import { ApiError } from "../ApiError";
import { AdminService } from "./AdminService";
import { DimensionIntegrationsService } from "../dimension/DimensionIntegrationsService";
import { WidgetStore } from "../../db/WidgetStore";
import { Cache, CACHE_INTEGRATIONS } from "../../MemoryCache";
import { Integration } from "../../integrations/Integration";
import { LogService } from "matrix-js-snippets";
import { BridgeStore } from "../../db/BridgeStore";

interface SetEnabledRequest {
    enabled: boolean;
}

interface SetOptionsRequest {
    options: any;
}

/**
 * Administrative API for managing the integrations for Dimension. This is to enable/disable integrations
 * and set basic options. See the NEB APIs for configuring go-neb instances.
 */
@Path("/_dimension/api/v1/dimension/admin/integrations")
export class AdminIntegrationsService {

    @POST
    @Path(":category/:type/options")
    public async setOptions(@QueryParam("scalar_token") scalarToken: string, @PathParam("category") category: string, @PathParam("type") type: string, body: SetOptionsRequest): Promise<any> {
        const userId = await AdminService.validateAndGetAdminTokenOwner(scalarToken);

        if (category === "widget") await WidgetStore.setOptions(type, body.options);
        else throw new ApiError(400, "Unrecognized category");

        LogService.info("AdminIntegrationsService", userId + " updated the integration options for " + category + "/" + type);
        Cache.for(CACHE_INTEGRATIONS).clear();
        return {}; // 200 OK
    }


    @POST
    @Path(":category/:type/enabled")
    public async setEnabled(@QueryParam("scalar_token") scalarToken: string, @PathParam("category") category: string, @PathParam("type") type: string, body: SetEnabledRequest): Promise<any> {
        const userId = await AdminService.validateAndGetAdminTokenOwner(scalarToken);

        if (category === "widget") await WidgetStore.setEnabled(type, body.enabled);
        else if (category === "bridge") await BridgeStore.setEnabled(type, body.enabled);
        else throw new ApiError(400, "Unrecognized category");

        LogService.info("AdminIntegrationsService", userId + " set " + category + "/" + type + " to " + (body.enabled ? "enabled" : "disabled"));
        Cache.for(CACHE_INTEGRATIONS).clear();
        return {}; // 200 OK
    }

    @GET
    @Path(":category/all")
    public async getAllIntegrations(@QueryParam("scalar_token") scalarToken: string, @PathParam("category") category: string): Promise<Integration[]> {
        const userId = await AdminService.validateAndGetAdminTokenOwner(scalarToken);

        if (category === "widget") return await DimensionIntegrationsService.getWidgets(false);
        else if (category === "bridge") return await DimensionIntegrationsService.getBridges(false, userId);
        else throw new ApiError(400, "Unrecongized category");
    }
}