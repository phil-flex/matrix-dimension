import { QueryInterface } from "sequelize";
import { DataType } from "sequelize-typescript";

export default {
    up: (queryInterface: QueryInterface) => {
        return Promise.resolve()
            .then(() => queryInterface.createTable("dimension_sticker_packs", {
                "id": {type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
                "type": {type: DataType.STRING, allowNull: false},
                "name": {type: DataType.STRING, allowNull: false},
                "avatarUrl": {type: DataType.STRING, allowNull: false},
                "description": {type: DataType.STRING, allowNull: false},
                "isEnabled": {type: DataType.BOOLEAN, allowNull: false},
                "isPublic": {type: DataType.BOOLEAN, allowNull: false},
                "authorType": {type: DataType.STRING, allowNull: false},
                "authorReference": {type: DataType.STRING, allowNull: true},
                "authorName": {type: DataType.STRING, allowNull: true},
                "license": {type: DataType.STRING, allowNull: false},
                "licensePath": {type: DataType.STRING, allowNull: true},
            }))
            .then(() => queryInterface.createTable("dimension_stickers", {
                "id": {type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
                "packId": {
                    type: DataType.INTEGER, allowNull: false,
                    references: {model: "dimension_sticker_packs", key: "id"},
                    onUpdate: "cascade", onDelete: "cascade",
                },
                "name": {type: DataType.STRING, allowNull: false},
                "description": {type: DataType.STRING, allowNull: false},
                "imageMxc": {type: DataType.STRING, allowNull: false},
                "thumbnailMxc": {type: DataType.STRING, allowNull: false},
                "thumbnailWidth": {type: DataType.INTEGER, allowNull: false},
                "thumbnailHeight": {type: DataType.INTEGER, allowNull: false},
                "mimetype": {type: DataType.STRING, allowNull: false},
            }))
            .then(() => queryInterface.bulkInsert("dimension_sticker_packs", [
                {
                    // id: 4
                    type: "stickerpack",
                    name: "Emoji",
                    avatarUrl: "mxc://matrix.org/tiCqcqdBFvmtABYRkYAqAdzK",
                    isEnabled: true,
                    isPublic: true,
                    description: "The most common Emoji.",
                    authorType: "none",
                    authorReference: null,
                    authorName: null,
                    license: "GPL-v3.0",
                    licensePath: "/licenses/gpl-v3.0.txt",
                },
            ]))
            .then(() => queryInterface.bulkInsert("dimension_stickers", [
                { packId: 4, name: "Angel", description: "Angel", imageMxc: "mxc://matrix.org/dcHcUMrrfvctnyWvUKShndAP", thumbnailMxc: "mxc://matrix.org/TwaYWopxVGVjyhmJDnAElkUq", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Crying", description: "Crying", imageMxc: "mxc://matrix.org/lyFPKszcpgBTOQuwJGMZmTtv", thumbnailMxc: "mxc://matrix.org/ZwwzwEVnhnPbORxllLpPmaLU", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Wink", description: "Wink", imageMxc: "mxc://matrix.org/AWWpGQMqaWSNiqQXtBdBtZqC", thumbnailMxc: "mxc://matrix.org/tmKvzAeyQZiPtKQMPzdFLYZG", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Angry", description: "Angry", imageMxc: "mxc://matrix.org/TMZJwCnjKVdkimdIiRHaIJPj", thumbnailMxc: "mxc://matrix.org/ZgpNNUHSUjpYetTfAOoPhchj", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Laughing", description: "Laughing", imageMxc: "mxc://matrix.org/pUHqVIXAdruUTNhdFSCPWhDL", thumbnailMxc: "mxc://matrix.org/cguklMGHOrNJQcneJgNOYkZd", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Nerd", description: "Nerd", imageMxc: "mxc://matrix.org/mZIdYvNkEOHowWrhPdmhSEWA", thumbnailMxc: "mxc://matrix.org/PHibsjSJDnJIqlvPyhhjFGQw", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Shocked", description: "Shocked", imageMxc: "mxc://matrix.org/idzedhxYGFuFiMAAMOgZCjWt", thumbnailMxc: "mxc://matrix.org/sihrgYjOlTVEUZaPQzVQSfrS", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy", description: "Happy", imageMxc: "mxc://matrix.org/AnSEMytLmpNXDhRfYQEFZjpU", thumbnailMxc: "mxc://matrix.org/VKBjjoYmInsmiaweKyyPipIF", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy2", description: "Happy2", imageMxc: "mxc://matrix.org/oqCQcYcgkoNclXqTulXAqchu", thumbnailMxc: "mxc://matrix.org/crISwezniSUeBJzRWSGgGWNl", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Surprised", description: "Surprised", imageMxc: "mxc://matrix.org/uexlgOrWOXgnGwhcatQywQBy", thumbnailMxc: "mxc://matrix.org/jaxROYfMFbkKOvlJFqYGnZUG", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Embarrassed", description: "Embarrassed", imageMxc: "mxc://matrix.org/wSlaKvRjnGARTYqRVQonKLVQ", thumbnailMxc: "mxc://matrix.org/OBBWisdAYOKFAyVIGjLIbnym", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Cute", description: "Cute", imageMxc: "mxc://matrix.org/lDArDuZRyepvHXNGfeDpspcA", thumbnailMxc: "mxc://matrix.org/oUVfzgXbDQDZuXaxobTCihLs", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy4", description: "Happy4", imageMxc: "mxc://matrix.org/QvBJseaozarUSDKkprTKQzta", thumbnailMxc: "mxc://matrix.org/SsITwtAxrudGTaNYJXIkaJtw", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Crying2", description: "Crying2", imageMxc: "mxc://matrix.org/bxXbQGVEokukvhTuZvfvgXuk", thumbnailMxc: "mxc://matrix.org/ROJKmBHCjGjbcjkpYlMruNCs", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy7", description: "Happy7", imageMxc: "mxc://matrix.org/MBfuvPYTTHwWtTHhosMfYENo", thumbnailMxc: "mxc://matrix.org/tiCqcqdBFvmtABYRkYAqAdzK", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy3", description: "Happy3", imageMxc: "mxc://matrix.org/SNqNcmKcsckZLWNjulDkKnzz", thumbnailMxc: "mxc://matrix.org/anuFIsWXFtEKalGwPEIgZlvz", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy1", description: "Happy1", imageMxc: "mxc://matrix.org/kdifFdJVHrjHqVPkrTQvxnBb", thumbnailMxc: "mxc://matrix.org/UkBVOmgTFHYuhqOIFxhOXRHp", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Surprised3", description: "Surprised3", imageMxc: "mxc://matrix.org/ADxtMgBjDlWBPgtGNIrivVUc", thumbnailMxc: "mxc://matrix.org/EAhajRcULsVJhxzcVsONSkCq", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Serious", description: "Serious", imageMxc: "mxc://matrix.org/uSFJpDNNAwvUYtizYXLDwRgv", thumbnailMxc: "mxc://matrix.org/ncplKYmXyaZrGFwYWQnKIPcK", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Happy5", description: "HAppy5", imageMxc: "mxc://matrix.org/heSTMDwOGGCPkuoxlRttElWw", thumbnailMxc: "mxc://matrix.org/dBYcbPFEQKAuXlzbApATSadh", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Cool1", description: "Cool1", imageMxc: "mxc://matrix.org/mKefYyCuWHLvSjAskTuMJJBX", thumbnailMxc: "mxc://matrix.org/ENCKFWhqgQcLnhlJuvrFGFmu", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Kiss", description: "Kiss", imageMxc: "mxc://matrix.org/dlqEWXoZvWTYjpBhXebpZBEV", thumbnailMxc: "mxc://matrix.org/UrJIawlekQhuAgKpkZqQJgmZ", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Suspicious", description: "Suspicious", imageMxc: "mxc://matrix.org/EuJLLleJbjXURQKLokDatOHe", thumbnailMxc: "mxc://matrix.org/WuPUCIYXWbfLzXEfUECegHKU", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Greed", description: "Greed", imageMxc: "mxc://matrix.org/wDoTmQniLabniGwIDpCSwJsk", thumbnailMxc: "mxc://matrix.org/HAAHbCwjeKbZiaAfaTSbTzEA", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Angry", description: "Angry", imageMxc: "mxc://matrix.org/KTilYFxTzJuLRxYjOLIkklZp", thumbnailMxc: "mxc://matrix.org/nePzxvVmSgLkVVfTFMtXBhCQ", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Laughing", description: "Laughing", imageMxc: "mxc://matrix.org/QXDADSMtbMxtIfTlCeXxPxGV", thumbnailMxc: "mxc://matrix.org/sYHHSckpilljgHBpdjGakrhJ", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Kiss1", description: "Kiss1", imageMxc: "mxc://matrix.org/XYADkHUEdvoJWzBmpcFNAUaj", thumbnailMxc: "mxc://matrix.org/ZZdguLGksZuqPwifPpAtIhYA", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Confused", description: "Confused", imageMxc: "mxc://matrix.org/vGyHQzKkrhylPIVkXxBmiwhm", thumbnailMxc: "mxc://matrix.org/BwoURQqynertgtTiqsUAJMaG", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Vain", description: "Vain", imageMxc: "mxc://matrix.org/dHUnMzcsDadidKWGnpZSqXOW", thumbnailMxc: "mxc://matrix.org/OWVaUnvfBtxBDgQRzMiQBAQj", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Scare", description: "Scare", imageMxc: "mxc://matrix.org/bSKaXOFitXXoZiPHTbXctCFg", thumbnailMxc: "mxc://matrix.org/EpmWLXRzHurmvWWFdLbCkcFe", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Sad", description: "Sad", imageMxc: "mxc://matrix.org/yABdIQjzQpIJzJxVkFbEdtVN", thumbnailMxc: "mxc://matrix.org/zyfwAtMkGQHKPmJhcfUYsNYi", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Muted", description: "Muted", imageMxc: "mxc://matrix.org/wcIDEsrlZVgMqZfQtdfeAsCr", thumbnailMxc: "mxc://matrix.org/jvkfKEtUNGYmWiCuetxBcWZo", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Smart", description: "Smart", imageMxc: "mxc://matrix.org/PniylXnMozcwhByeEPYvqTWd", thumbnailMxc: "mxc://matrix.org/PzpVWpDXnkUwxByPjXllPhqk", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Sad1", description: "Sad1", imageMxc: "mxc://matrix.org/xcrCTSbckghBXwUUHZIlbLrM", thumbnailMxc: "mxc://matrix.org/CdPAcOhuburxLJfMErkIwEVa", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Emoji", description: "Emoji", imageMxc: "mxc://matrix.org/nWHALpJFvWqtcLeugtCHwfkk", thumbnailMxc: "mxc://matrix.org/jlSPvVbPvtRDaktnfWfrfnTH", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Surprised", description: "Surprised", imageMxc: "mxc://matrix.org/uPUyyNBkzJJlZoyuIHHmRCsP", thumbnailMxc: "mxc://matrix.org/JICRmLFQWyMiZojgPCTPdotP", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Cool", description: "Cool", imageMxc: "mxc://matrix.org/hVPifjKWPSLQZWAuCxsSoYxq", thumbnailMxc: "mxc://matrix.org/kidOjvHmECiWbWGQycLvMvSk", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Wink", description: "Wink", imageMxc: "mxc://matrix.org/uHuyUyShvCfnwOzfzYypjnuq", thumbnailMxc: "mxc://matrix.org/yFTxTEhcqMkHFaLqQrCjzzbz", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Tongue", description: "Tongue", imageMxc: "mxc://matrix.org/EBMZNpNLMzpKFPINjfdVDAjO", thumbnailMxc: "mxc://matrix.org/wZZvkeRRtZaFtlrcguDcayyk", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Sick", description: "Sick", imageMxc: "mxc://matrix.org/oDtMciwswBVjJryAgfBzEiia", thumbnailMxc: "mxc://matrix.org/QOoiuBTcdXpofKYSCBizhwTQ", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Surprised1", description: "Surprised1", imageMxc: "mxc://matrix.org/JNUxYJFACYgbiSeltlleSWtx", thumbnailMxc: "mxc://matrix.org/niGEdkqmUMGcaEkIShzDiEKM", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Laughing2", description: "Laughing2", imageMxc: "mxc://matrix.org/GnnBUfzVMEAXmmzFZyKLSZNm", thumbnailMxc: "mxc://matrix.org/KVdWigUNIXnlNMdDvyMtkFHj", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Surprised4", description: "Surprised4", imageMxc: "mxc://matrix.org/kImCdeAEJWoifJrTjbuCUPtg", thumbnailMxc: "mxc://matrix.org/SJTfsFRbCggTSYRUOLLgbHfu", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Arrogant", description: "Arrogant", imageMxc: "mxc://matrix.org/qxjMFdINfseeDOvVtfFsTMMQ", thumbnailMxc: "mxc://matrix.org/esyKnpzCDPvpJHwXwEiqvzjF", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Sleepy", description: "Sleepy", imageMxc: "mxc://matrix.org/lKqDnBnaEnLzlLiNEbzEHYaR", thumbnailMxc: "mxc://matrix.org/MheSGItjjjBUNGxGUEADeFmE", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Sad", description: "Sad", imageMxc: "mxc://matrix.org/JFbTpGhbzacLjLlpGcHIucPy", thumbnailMxc: "mxc://matrix.org/wmEBJjXdfonWXJxjHqYQUZJY", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Inlove", description: "In love", imageMxc: "mxc://matrix.org/tJclHRvzIVvVzcPqqSkUKlwU", thumbnailMxc: "mxc://matrix.org/hdmWqQTQnyDvvrCtpxldOUSV", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
                { packId: 4, name: "Bored", description: "Bored", imageMxc: "mxc://matrix.org/EcNaXpnOdywaxRgXvAnCvGIP", thumbnailMxc: "mxc://matrix.org/YhVDZDGwsriEYdfkoCJAjJpL", mimetype: "image/png", thumbnailWidth: 150, thumbnailHeight: 150 },
            ]));
    },
    down: (queryInterface: QueryInterface) => {
        return Promise.resolve()
            .then(() => queryInterface.dropTable("dimension_stickers"))
            .then(() => queryInterface.dropTable("dimension_sticker_packs"));
    }
}
