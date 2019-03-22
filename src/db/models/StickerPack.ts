import { AllowNull, AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IntegrationRecord } from "./IntegrationRecord";

@Table({
    tableName: "dimension_sticker_packs",
    underscoredAll: false,
    timestamps: false,
})
export default class StickerPack extends Model<StickerPack> implements IntegrationRecord {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    type: string;

    @Column
    name: string;

    @Column
    avatarUrl: string;

    @Column
    description: string;

    @Column
    isEnabled: boolean;

    @Column
    isPublic: boolean;

    @Column
    authorType: string;

    @Column
    authorReference: string;

    @Column
    authorName: string;

    @Column
    license: string;

    @Column
    licensePath: string;

    @AllowNull
    @Column
    trackingRoomAlias: string;
}