import Optional from "optional.js";
import { IController } from "./controller";
import { createController } from "./controllerfactory";
import { RouteNotFoundError } from "./errors";
import Navigation from "./navigation";
import { IControllerType, Router } from "./router";

export const Request = (key: string): void => {

    const getControllerForKey = (): Optional<IController> => {
        const controllerType = Router.Instance.routeTo(key);

        if ( !controllerType.isPresent() ) {
            throw new RouteNotFoundError(key);
        }
        return controllerType.map((c) => createController(c));
    };

    const updateNavigationStack = (controller: IController) => {
        Navigation.push(controller);
    };

    getControllerForKey()
        .map(updateNavigationStack);
};
