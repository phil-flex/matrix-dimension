import { Injectable } from "@angular/core";

@Injectable()
export class MediaService {
    public getThumbnailUrl(mxc: string, width: number, height: number, method: "scale" | "crop" = "scale", isAnimated = true): string {
        mxc = mxc.substring("mxc://".length).split('?')[0];
        return `/_dimension/api/v1/dimension/media/thumbnail/${mxc}?width=${width}&height=${height}&method=${method}&animated=${isAnimated}`;
    }
}
