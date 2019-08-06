import { Context, GET, Path, PathParam, POST, Security, ServiceContext } from "typescript-rest";
import { LogService } from "matrix-js-snippets";
import { IrcBridge } from "../../bridges/IrcBridge";
import IrcBridgeRecord from "../../db/models/IrcBridgeRecord";
import { ApiError } from "../ApiError";
import { ROLE_USER } from "../security/MatrixSecurity";

interface RequestLinkRequest {
    op: string;
}

/**
 * API for interacting with the IRC bridge
 */
@Path("/_dimension/api/v1/dimension/irc")
export class DimensionIrcService {

    @Context
    private context: ServiceContext;

    @GET
    @Path(":networkId/channel/:channel/ops")
    @Security(ROLE_USER)
    public async getOps(@PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string): Promise<string[]> {
        const userId = this.context.request.user.userId;
        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPk(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        const operators = await client.getOperators(bridge, parsed.bridgeNetworkId, "#" + channelNoHash);

        LogService.info("DimensionIrcService", userId + " listed the operators for #" + channelNoHash + " on " + networkId);
        return operators;
    }

    @POST
    @Path(":networkId/channel/:channel/link/:roomId")
    @Security(ROLE_USER)
    public async requestLink(@PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string, @PathParam("roomId") roomId: string, request: RequestLinkRequest): Promise<any> {
        const userId = this.context.request.user.userId;
        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPk(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        await client.requestLink(bridge, parsed.bridgeNetworkId, "#" + channelNoHash, request.op, roomId);

        LogService.info("DimensionIrcService", userId + " requested #" + channelNoHash + " on " + networkId + " to be linked to " + roomId);
        return {}; // 200 OK
    }

    @POST
    @Path(":networkId/channel/:channel/unlink/:roomId")
    @Security(ROLE_USER)
    public async unlink(@PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string, @PathParam("roomId") roomId: string): Promise<any> {
        const userId = this.context.request.user.userId;
        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPk(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        await client.removeLink(bridge, parsed.bridgeNetworkId, "#" + channelNoHash, roomId);

        LogService.info("DimensionIrcService", userId + " unlinked #" + channelNoHash + " on " + networkId + " from " + roomId);
        return {}; // 200 OK
    }
}
