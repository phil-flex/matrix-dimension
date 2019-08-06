import { Context, GET, Path, PathParam, POST, QueryParam, Security, ServiceContext } from "typescript-rest";
import { Cache, CACHE_INTEGRATIONS, CACHE_TELEGRAM_BRIDGE } from "../../MemoryCache";
import { LogService } from "matrix-js-snippets";
import { ApiError } from "../ApiError";
import TelegramBridgeRecord from "../../db/models/TelegramBridgeRecord";
import { ROLE_ADMIN, ROLE_USER } from "../security/MatrixSecurity";

interface CreateWithUpstream {
    upstreamId: number;
}

interface CreateSelfhosted {
    provisionUrl: string;
    sharedSecret: string;
    allowTgPuppets: boolean;
    allowMxPuppets: boolean;
}

interface BridgeResponse {
    id: number;
    upstreamId?: number;
    provisionUrl?: string;
    allowTgPuppets?: boolean;
    allowMxPuppets?: boolean;
    sharedSecret?: string;
    isEnabled: boolean;
}

/**
 * Administrative API for configuring Telegram bridge instances.
 */
@Path("/_dimension/api/v1/dimension/admin/telegram")
export class AdminTelegramService {

    @Context
    private context: ServiceContext;

    @GET
    @Path("all")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async getBridges(): Promise<BridgeResponse[]> {
        const bridges = await TelegramBridgeRecord.findAll();
        return Promise.all(bridges.map(async b => {
            return {
                id: b.id,
                upstreamId: b.upstreamId,
                provisionUrl: b.provisionUrl,
                allowTgPuppets: b.allowTgPuppets,
                allowMxPuppets: b.allowMxPuppets,
                sharedSecret: b.sharedSecret,
                isEnabled: b.isEnabled,
            };
        }));
    }

    @GET
    @Path(":bridgeId")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async getBridge(@PathParam("bridgeId") bridgeId: number): Promise<BridgeResponse> {
        const telegramBridge = await TelegramBridgeRecord.findByPk(bridgeId);
        if (!telegramBridge) throw new ApiError(404, "Telegram Bridge not found");

        return {
            id: telegramBridge.id,
            upstreamId: telegramBridge.upstreamId,
            provisionUrl: telegramBridge.provisionUrl,
            allowTgPuppets: telegramBridge.allowTgPuppets,
            allowMxPuppets: telegramBridge.allowMxPuppets,
            sharedSecret: telegramBridge.sharedSecret,
            isEnabled: telegramBridge.isEnabled,
        };
    }

    @POST
    @Path(":bridgeId")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async updateBridge(@PathParam("bridgeId") bridgeId: number, request: CreateSelfhosted): Promise<BridgeResponse> {
        const userId = this.context.request.user.userId;

        const bridge = await TelegramBridgeRecord.findByPk(bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        bridge.provisionUrl = request.provisionUrl;
        bridge.sharedSecret = request.sharedSecret;
        bridge.allowTgPuppets = request.allowTgPuppets;
        bridge.allowMxPuppets = request.allowMxPuppets;
        await bridge.save();

        LogService.info("AdminTelegramService", userId + " updated Telegram Bridge " + bridge.id);

        Cache.for(CACHE_TELEGRAM_BRIDGE).clear();
        Cache.for(CACHE_INTEGRATIONS).clear();
        return this.getBridge(bridge.id);
    }

    @POST
    @Path("new/upstream")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async newConfigForUpstream(@QueryParam("scalar_token") _scalarToken: string, _request: CreateWithUpstream): Promise<BridgeResponse> {
        throw new ApiError(400, "Cannot create a telegram bridge from an upstream");
    }

    @POST
    @Path("new/selfhosted")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async newSelfhosted(request: CreateSelfhosted): Promise<BridgeResponse> {
        const userId = this.context.request.user.userId;

        const bridge = await TelegramBridgeRecord.create({
            provisionUrl: request.provisionUrl,
            sharedSecret: request.sharedSecret,
            allowTgPuppets: request.allowTgPuppets,
            allowMxPuppets: request.allowMxPuppets,
            isEnabled: true,
        });
        LogService.info("AdminTelegramService", userId + " created a new Telegram Bridge with provisioning URL " + request.provisionUrl);

        Cache.for(CACHE_TELEGRAM_BRIDGE).clear();
        Cache.for(CACHE_INTEGRATIONS).clear();
        return this.getBridge(bridge.id);
    }
}