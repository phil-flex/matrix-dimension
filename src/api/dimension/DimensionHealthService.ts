import { GET, Path } from "typescript-rest";
import { LogService } from "matrix-js-snippets";

/**
 * API for the health of Dimension
 */
@Path("/_dimension/api/v1/dimension/health")
export class DimensionHealthService {

    @GET
    @Path("heartbeat")
    public async heartbeat(): Promise<any> {
        LogService.info("DimensionHealthService", "Heartbeat called");
        return {}; // 200 OK
    }
}