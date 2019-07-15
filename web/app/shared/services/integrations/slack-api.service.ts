import { Injectable } from "@angular/core";
import { AuthedApi } from "../authed-api";
import { FE_SlackChannel, FE_SlackLink, FE_SlackTeam } from "../../models/slack";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SlackApiService extends AuthedApi {
    constructor(http: HttpClient) {
        super(http);
    }

    public bridgeRoom(roomId: string, teamId: string, channelId: string): Promise<FE_SlackLink> {
        return this.authedPost<FE_SlackLink>("/_dimension/api/v1/dimension/slack/room/" + roomId + "/link", {
            teamId,
            channelId
        }).toPromise();
    }

    public unbridgeRoom(roomId: string): Promise<any> {
        return this.authedDelete("/_dimension/api/v1/dimension/slack/room/" + roomId + "/link").toPromise();
    }

    public getLink(roomId: string): Promise<FE_SlackLink> {
        return this.authedGet<FE_SlackLink>("/_dimension/api/v1/dimension/slack/room/" + roomId + "/link").toPromise();
    }

    public getTeams(): Promise<FE_SlackTeam[]> {
        return this.authedGet<FE_SlackTeam[]>("/_dimension/api/v1/dimension/slack/teams").toPromise();
    }

    public getChannels(teamId: string): Promise<FE_SlackChannel[]> {
        return this.authedGet<FE_SlackChannel[]>("/_dimension/api/v1/dimension/slack/teams/" + teamId + "/channels").toPromise();
    }

    public getAuthUrl(): Promise<string> {
        return this.authedGet("/_dimension/api/v1/dimension/slack/auth").toPromise()
            .then(r => r["authUrl"]);
    }
}