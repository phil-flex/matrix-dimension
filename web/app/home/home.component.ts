import { Component } from "@angular/core";

@Component({
    selector: "my-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {

    public hostname: string = window.location.origin;
    public showPromoPage = this.hostname === "https://dimension.t2bot.io";

    public integrationsConfig = `` +
        `"integrations_ui_url": "${this.hostname}/_dimension/riot",\n` +
        `"integrations_rest_url": "${this.hostname}/_dimension/api/v1/scalar",\n` +
        `"integrations_widgets_urls": ["${this.hostname}/_dimension/widgets"],\n` +
        `"integrations_jitsi_widget_url": "${this.hostname}/_dimension/widgets/jitsi",\n`;

        "git clone https://github.com/phil-flex/matrix-dimension.git\n" +
    constructor() {
        // Do stuff
    }

}
