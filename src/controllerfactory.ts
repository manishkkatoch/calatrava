import Optional from "optional.js";
import { IController } from "./controller";
import { NativeViewNotFoundError } from "./errors";
import { Calatrava } from "./index";

import { INativeView } from "./nativeview";
export interface IControllerCreator<T extends IController> {
    new(view: INativeView, ...args: any[]): T;
}

export function createController<T extends IController>(
    ctor: IControllerCreator<T>,
    ...args: any[]): T {
        const nativeView = Calatrava.NativePlatform.getPage(ctor.name);
        if ( !nativeView ) {
            throw new NativeViewNotFoundError(ctor.name);
        }

        return new ctor(nativeView, ...args);
}
