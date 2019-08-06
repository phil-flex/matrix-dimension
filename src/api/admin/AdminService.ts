import { GET, Path, POST, QueryParam, Security } from "typescript-rest";
import config from "../../config";
import { MatrixLiteClient } from "../../matrix/MatrixLiteClient";
import { CURRENT_VERSION } from "../../version";
import { getFederationConnInfo } from "../../matrix/helpers";
import UserScalarToken from "../../db/models/UserScalarToken";
import { Cache, CACHE_SCALAR_ACCOUNTS } from "../../MemoryCache";
import { ROLE_ADMIN, ROLE_USER } from "../security/MatrixSecurity";

interface DimensionVersionResponse {
    version: string;
}

interface DimensionConfigResponse {
    admins: string[];
    widgetBlacklist: string[];
    homeserver: {
        name: string;
        userId: string;
        federationUrl: string;
        federationHostname: string;
        clientServerUrl: string;
    };
    sessionInfo: {
        numTokens: number;
    };
}

/**
 * Administrative API for general information about Dimension
 */
@Path("/_dimension/api/v1/dimension/admin")
export class AdminService {

    @GET
    @Path("check")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async checkIfAdmin(): Promise<{}> {
        return {}; // A 200 OK essentially means "you're an admin".
    }

    @GET
    @Path("version")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async getVersion(): Promise<DimensionVersionResponse> {
        return {version: CURRENT_VERSION};
    }

    @GET
    @Path("config")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async getConfig(): Promise<DimensionConfigResponse> {
        const client = new MatrixLiteClient(config.homeserver.accessToken);
        const fedInfo = await getFederationConnInfo(config.homeserver.name);
        return {
            admins: config.admins,
            widgetBlacklist: config.widgetBlacklist,
            homeserver: {
                name: config.homeserver.name,
                userId: await client.whoAmI(),
                federationUrl: fedInfo.url,
                federationHostname: fedInfo.hostname,
                clientServerUrl: config.homeserver.clientServerUrl,
            },
            sessionInfo: {
                numTokens: await UserScalarToken.count(),
            },
        };
    }

    @GET
    @Path("test/federation")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async testFederationRouting(@QueryParam("server_name") serverName: string): Promise<any> {
        return {
            inputServerName: serverName,
            resolvedServer: await getFederationConnInfo(serverName),
        };
    }

    @POST
    @Path("sessions/logout/all")
    @Security([ROLE_USER, ROLE_ADMIN])
    public async logoutAll(): Promise<any> {
        // Clear the cache first to hopefully invalidate a bunch of them
        Cache.for(CACHE_SCALAR_ACCOUNTS).clear();

        const tokens = await UserScalarToken.findAll();
        for (const token of tokens) {
            await token.destroy();
        }

        // Clear it again because the delete loop can be slow
        Cache.for(CACHE_SCALAR_ACCOUNTS).clear();

        return {};
    }
}