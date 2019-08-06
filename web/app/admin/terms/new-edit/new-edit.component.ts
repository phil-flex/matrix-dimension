import { Component, OnInit } from "@angular/core";
import { ToasterService } from "angular2-toaster";
import { AdminTermsApiService } from "../../../shared/services/admin/admin-terms-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ISO6391 from "iso-639-1";
import { Modal, overlayConfigFactory } from "ngx-modialog";
import {
    AdminTermsNewEditPublishDialogComponent,
    AdminTermsNewEditPublishDialogContext
} from "./publish/publish.component";

interface ILanguage {
    name: string,
    text: string,
    langName: string,
    url: string,
    isExternal: boolean,
    externalUrl: string,
}

@Component({
    templateUrl: "./new-edit.component.html",
    styleUrls: ["./new-edit.component.scss"],
})
export class AdminNewEditTermsComponent implements OnInit {

    // TODO: Multiple language support
    // TODO: Support external URLs

    private shortcode: string;

    public Editor = ClassicEditor;

    public isLoading = true;
    public isUpdating = false;
    public takenShortcodes: string[];
    public chosenLanguage: string = ISO6391.getAllCodes()[0];
    public languages: {
        [languageCode: string]: ILanguage;
    } = {
        "en": {
            name: "",
            text: "",
            langName: "English",
            url: "", // TODO: Calculate
            isExternal: false,
            externalUrl: "",
        },
    };
    public isEditing = false;

    public get chosenLanguageCodes(): string[] {
        return Object.keys(this.languages);
    }

    public get availableLanguages(): { name: string, code: string }[] {
        return ISO6391.getAllCodes()
            .filter(c => !this.chosenLanguageCodes.includes(c))
            .map(c => {
                return {code: c, name: ISO6391.getName(c)};
            });
    }

    constructor(private adminTerms: AdminTermsApiService,
                private toaster: ToasterService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modal: Modal) {
    }

    public ngOnInit() {
        let params = this.activatedRoute.snapshot.params;
        this.shortcode = params.shortcode;
        this.isEditing = !!this.shortcode;

        if (this.isEditing) {
            this.adminTerms.getDraft(this.shortcode).then(policy => {
                this.shortcode = policy.shortcode;
                this.languages = {};

                for (const code in policy.languages) {
                    const i18nPolicy = policy.languages[code];
                    this.languages[code] = {
                        text: i18nPolicy.text,
                        url: i18nPolicy.url,
                        name: i18nPolicy.name,
                        isExternal: false,
                        langName: ISO6391.getName(code),
                        externalUrl: "",
                    };
                }

                this.isLoading = false;
            }).catch(err => {
                console.error(err);
                this.toaster.pop("error", "Failed to load policy");
            });
        } else {
            this.adminTerms.getAllPolicies().then(policies => {
                this.takenShortcodes = policies.map(p => p.shortcode);
                this.isLoading = false;
            }).catch(err => {
                console.error(err);
                this.toaster.pop("error", "Failed to load policies");
            });
        }
    }

    public async publish() {
        this.isUpdating = true;

        await this.adminTerms.updateDraft(this.shortcode, {
            name: this.languages['en'].name,
            text: this.languages['en'].text,
            url: `${window.location.origin}/widgets/terms/${this.shortcode}/en/draft`,
        });


        this.modal.open(AdminTermsNewEditPublishDialogComponent, overlayConfigFactory({
            isBlocking: true,
            size: 'sm',
        }, AdminTermsNewEditPublishDialogContext)).result.then(async (val) => {
            if (!val) return; // closed without publish

            try {
                // Change the URL of the draft
                // TODO: Don't track URLs for drafts
                await this.adminTerms.updateDraft(this.shortcode, {
                    name: this.languages['en'].name,
                    text: this.languages['en'].text,
                    url: `${window.location.origin}/widgets/terms/${this.shortcode}/en/${val}`,
                });

                await this.adminTerms.publishDraft(this.shortcode, val);
                this.toaster.pop("success", "Policy published");
                this.router.navigate(["../.."], {relativeTo: this.activatedRoute});
            } catch (e) {
                console.error(e);
                this.toaster.pop("error", "Error publishing policy");
                this.isUpdating = false;
            }
        });
    }

    public async create() {
        for (const languageCode in this.languages) {
            if (this.languages[languageCode].name.trim().length <= 0) {
                this.toaster.pop("warning", "Please enter a name for all policies");
                return;
            }
            if (this.languages[languageCode].text.trim().length <= 0) {
                this.toaster.pop("warning", "Please enter text for all policies");
                return;
            }
        }

        this.isUpdating = true;

        if (this.isEditing) {
            try {
                await this.adminTerms.updateDraft(this.shortcode, {
                    name: this.languages['en'].name,
                    text: this.languages['en'].text,
                    url: `${window.location.origin}/widgets/terms/${this.shortcode}/en/draft`,
                });

                this.toaster.pop("success", "Draft saved");
                this.router.navigate(["../.."], {relativeTo: this.activatedRoute});
            } catch (e) {
                console.error(e);
                this.toaster.pop("error", "Error saving policy");
                this.isUpdating = false;
            }
            return;
        }

        const startShortcode = this.languages['en'].name.toLowerCase().replace(/[^a-z0-9]/gi, '_');
        let shortcode = startShortcode;
        let i = 0;
        while (this.takenShortcodes.includes(shortcode)) {
            shortcode = `${startShortcode}_${++i}`;
        }

        try {
            await this.adminTerms.createDraft(shortcode, {
                name: this.languages['en'].name,
                text: this.languages['en'].text,
                url: `${window.location.origin}/widgets/terms/${shortcode}/en/draft`,
            });

            this.toaster.pop("success", "Draft created");
            this.router.navigate([".."], {relativeTo: this.activatedRoute});
        } catch (e) {
            console.error(e);
            this.toaster.pop("error", "Error creating document");
            this.isUpdating = false;
        }
    }

    public addLanguage() {
        this.languages[this.chosenLanguage] = {
            name: "",
            text: "",
            url: "", // TODO: Calculate
            isExternal: false,
            externalUrl: "",
            langName: ISO6391.getName(this.chosenLanguage),
        };
        this.chosenLanguage = this.availableLanguages[0].code;
    }

}
