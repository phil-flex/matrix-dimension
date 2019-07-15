import AppService from "./models/AppService";
import AppServiceUser from "./models/AppServiceUser";
import * as randomString from "random-string";
import { MatrixAppserviceClient } from "../matrix/MatrixAppserviceClient";
import { LogService } from "matrix-js-snippets";

export class AppserviceStore {

    public static async create(userPrefix: string): Promise<AppService> {
        const id = "dimension-" + randomString({length: 25});
        const asToken = randomString({length: 100});
        const hsToken = randomString({length: 100});

        return AppService.create({
            id: id,
            asToken: asToken,
            hsToken: hsToken,
            userPrefix: userPrefix,
        });
    }

    public static async getUser(appserviceId: string, userId: string): Promise<AppServiceUser> {
        const user = await AppServiceUser.findOne({where: {appserviceId: appserviceId, id: userId}});
        if (!user) throw new Error("User not found");
        return user;
    }

    public static async getByHomeserverToken(hsToken: string): Promise<AppService> {
        const appservice = await AppService.findOne({where: {hsToken: hsToken}});
        if (!appservice) throw new Error("Appservice not found");
        return appservice;
    }

    public static async getAllByUserPrefix(userPrefix: string): Promise<AppService[]> {
        return AppService.findAll({where: {userPrefix: userPrefix}});
    }

    public static getSafeUserId(userIdOrPrefix: string): string {
        // Force user IDs to be lowercase and strip out characters that aren't permitted
        // https://matrix.org/docs/spec/appendices.html#user-identifiers
        if (userIdOrPrefix.startsWith('@')) {
            // we only change out the parts we care about. The rest will be crushed down.
            userIdOrPrefix = userIdOrPrefix.replace(/@/g, '=40');
            userIdOrPrefix = userIdOrPrefix.replace(/:/g, '=3A');
        }
        return userIdOrPrefix.toLowerCase().replace(/[^a-z0-9._\-=]/g, '.');
    }

    public static async registerUser(appserviceId: string, userId: string): Promise<AppServiceUser> {
        const appservice = await AppService.findOne({where: {id: appserviceId}});
        if (!appservice) throw new Error("Appservice not found");

        LogService.info("AppserviceStore", "Registering to own " + userId + " in appservice " + appserviceId);
        const client = new MatrixAppserviceClient(appservice);
        const localpart = AppserviceStore.getSafeUserId(userId.substring(1).split(":")[0]);
        const response = await client.registerUser(localpart);
        LogService.info("AppserviceStore", "Successfully registered " + userId);

        return await AppServiceUser.create({
            id: userId,
            appserviceId: appserviceId,
            accessToken: response.access_token,
        });
    }

    public static async getOrCreateUser(appserviceId: string, userId: string): Promise<AppServiceUser> {
        const user = await AppServiceUser.findOne({where: {appserviceId: appserviceId, id: userId}});
        if (!user) return AppserviceStore.registerUser(appserviceId, userId);
        return user;
    }

    public static async getAppservice(id: string): Promise<AppService> {
        const appservice = await AppService.findByPk(id);
        if (!appservice) throw new Error("Appservice not found");
        return appservice;
    }

    private constructor() {
    }
}