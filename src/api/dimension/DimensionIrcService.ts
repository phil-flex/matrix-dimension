import { GET, Path, PathParam, POST, QueryParam } from "typescript-rest";
import { LogService } from "matrix-js-snippets";
import { ScalarService } from "../scalar/ScalarService";
import { IrcBridge } from "../../bridges/IrcBridge";
import IrcBridgeRecord from "../../db/models/IrcBridgeRecord";
import { ApiError } from "../ApiError";

interface RequestLinkRequest {
    op: string;
}

/**
 * API for interacting with the IRC bridge
 */
@Path("/_dimension/api/v1/dimension/irc")
export class DimensionIrcService {

    @GET
    @Path(":networkId/channel/:channel/ops")
    public async getOps(@QueryParam("scalar_token") scalarToken: string, @PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string): Promise<string[]> {
        const userId = await ScalarService.getTokenOwner(scalarToken);

        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPrimary(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        const operators = await client.getOperators(bridge, parsed.bridgeNetworkId, "#" + channelNoHash);

        LogService.info("DimensionIrcService", userId + " listed the operators for #" + channelNoHash + " on " + networkId);
        return operators;
    }

    @POST
    @Path(":networkId/channel/:channel/link/:roomId")
    public async requestLink(@QueryParam("scalar_token") scalarToken: string, @PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string, @PathParam("roomId") roomId: string, request: RequestLinkRequest): Promise<any> {
        const userId = await ScalarService.getTokenOwner(scalarToken);

        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPrimary(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        await client.requestLink(bridge, parsed.bridgeNetworkId, "#" + channelNoHash, request.op, roomId);

        LogService.info("DimensionIrcService", userId + " requested #" + channelNoHash + " on " + networkId + " to be linked to " + roomId);
        return {}; // 200 OK
    }

    @POST
    @Path(":networkId/channel/:channel/unlink/:roomId")
    public async unlink(@QueryParam("scalar_token") scalarToken: string, @PathParam("networkId") networkId: string, @PathParam("channel") channelNoHash: string, @PathParam("roomId") roomId: string): Promise<any> {
        const userId = await ScalarService.getTokenOwner(scalarToken);

        const parsed = IrcBridge.parseNetworkId(networkId);
        const bridge = await IrcBridgeRecord.findByPrimary(parsed.bridgeId);
        if (!bridge) throw new ApiError(404, "Bridge not found");

        const client = new IrcBridge(userId);
        await client.removeLink(bridge, parsed.bridgeNetworkId, "#" + channelNoHash, roomId);

        LogService.info("DimensionIrcService", userId + " unlinked #" + channelNoHash + " on " + networkId + " from " + roomId);
        return {}; // 200 OK
    }
}
