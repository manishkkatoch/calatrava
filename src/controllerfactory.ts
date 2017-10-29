import { CalatravaControllerCtor, IController } from "./controller";
import { NativeViewNotFoundError } from "./errors";
import { Calatrava } from "./index";
import { INativeView } from "./nativeview";

export function createController(
    calatravaControllerCtor: CalatravaControllerCtor,
    key: string,
    ...args: any[]): IController {
        const nativeView = Calatrava.NativePlatform.getPage(key);
        if ( !nativeView ) {
            throw new NativeViewNotFoundError(key);
        }
        return new calatravaControllerCtor(nativeView, args);
}
