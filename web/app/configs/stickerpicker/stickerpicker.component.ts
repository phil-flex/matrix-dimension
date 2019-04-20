import { Component, OnInit } from "@angular/core";
import { FE_UserStickerPack } from "../../shared/models/integration";
import { StickerApiService } from "../../shared/services/integrations/sticker-api.service";
import { ToasterService } from "angular2-toaster";
import { MediaService } from "../../shared/services/media.service";
import { ScalarClientApiService } from "../../shared/services/scalar/scalar-client-api.service";
import { WIDGET_STICKER_PICKER } from "../../shared/models/widget";

@Component({
    templateUrl: "stickerpicker.component.html",
    styleUrls: ["stickerpicker.component.scss"],
})
export class StickerpickerComponent implements OnInit {

    public isLoading = true;
    public isUpdating = false;
    public packs: FE_UserStickerPack[];

    // Import stuff
    public packUrl = "";
    public isImporting = false;
    public customEnabled = false;
    public managerUrl: string;
    public stickerBot: string;

    constructor(private stickerApi: StickerApiService,
                private media: MediaService,
                private scalarClient: ScalarClientApiService,
                private toaster: ToasterService,
                private window: Window) {
        this.isLoading = true;
        this.isUpdating = false;
    }

    public async ngOnInit() {
        try {
            this.packs = await this.stickerApi.getPacks();
            this.isLoading = false;
        } catch (e) {
            console.error(e);
            this.toaster.pop("error", "Failed to load sticker packs");
        }

        this.stickerApi.getConfig().then(config => {
            this.customEnabled = config.enabled;
            this.managerUrl = config.managerUrl;
            this.stickerBot = config.stickerBot;
        }).catch(err => console.error(err));
    }

    public importPack() {
        this.isImporting = true;
        this.stickerApi.importStickerpack(this.packUrl).then(pack => {
            // Insert at top for visibility
            this.packs.splice(0, 0, pack);
            this.packUrl = "";
            this.isImporting = false;
            this.toaster.pop("success", "Stickerpack added");
            this.addWidget();
        }).catch(err => {
            console.error(err);
            this.isImporting = false;
            this.toaster.pop("error", "Error adding stickerpack");
        });
    }

    public getThumbnailUrl(mxc: string, width: number, height: number, method: "crop" | "scale" = "scale"): string {
        return this.media.getThumbnailUrl(mxc, width, height, method, true);
    }

    public toggleSelected(pack: FE_UserStickerPack) {
        pack.isSelected = !pack.isSelected;
        this.isUpdating = true;
        this.stickerApi.togglePackSelection(pack.id, pack.isSelected).then(() => {
            this.isUpdating = false;
            this.toaster.pop("success", "Stickers updated");

            if (this.packs.filter(p => p.isSelected).length > 0) this.addWidget();
        }).catch(err => {
            console.error(err);
            pack.isSelected = !pack.isSelected; // revert change
            this.isUpdating = false;
            this.toaster.pop("error", "Error updating stickers");
        });
    }

    private async addWidget() {
        try {
            const widgets = await this.scalarClient.getWidgets();
            const stickerPicker = widgets.response.find(w => w.content && w.content.type === "m.stickerpicker");
            const widgetId = stickerPicker ? ((<any>stickerPicker).id || stickerPicker.state_key) : "dimension-stickerpicker-" + (new Date().getTime());

            const targetUrl = this.window.location.origin + "/widgets/stickerpicker";

            if (widgets.response[0].content.url === targetUrl) {
                console.warn("Not replacing Dimension sticker picker");
                return;
            }

            console.log("Force-setting new widget of ID " + widgetId);
            await this.scalarClient.setUserWidget({
                id: widgetId,
                type: WIDGET_STICKER_PICKER[0],
                url: this.window.location.origin + "/_dimension/widgets/stickerpicker",
                url: targetUrl,
                data: {
                    dimension: {
                        wrapperId: "stickerpicker",
                    },
                },
            });
        } catch (e) {
            console.error("Failed to check for Dimension sticker picker");
            console.error(e);
        }
    }
}
