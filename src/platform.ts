import Optional from "optional.js";
import { INativeView } from "./nativeview";

export interface IPlatform {
    getPage(name: string): INativeView | undefined;
    removePage(name: string);
}
