import { AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Upstream from "./Upstream";

@Table({
    tableName: "dimension_gitter_bridges",
    underscored: false,
    timestamps: false,
})
export default class GitterBridgeRecord extends Model<GitterBridgeRecord> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull
    @Column
    @ForeignKey(() => Upstream)
    upstreamId?: number;

    @AllowNull
    @Column
    provisionUrl?: string;

    @Column
    isEnabled: boolean;
}