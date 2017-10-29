import Optional from "optional.js";
import { IController } from "./controller";
import { createController } from "./controllerfactory";
import { RouteNotFoundError } from "./errors";
import Navigation from "./navigation";
import { Router } from "./router";

export const Request = (calatravaControllerName: string, args: any[]): void => {
    const getControllerForKey = (key, params): Optional<IController> => {
        const calatravaControllerCtor = Router.Instance.routeTo(key);
        if (!calatravaControllerCtor.isPresent()) {
            throw new RouteNotFoundError(key);
        }
        return calatravaControllerCtor.map((ctor) => createController(ctor, key, params));
    };

    const updateNavigationStack = (controller: IController): void => Navigation.push(controller);

    getControllerForKey(calatravaControllerName, args).ifPresent(updateNavigationStack);
};
