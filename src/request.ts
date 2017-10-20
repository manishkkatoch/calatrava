import { createController, IController } from "./controller";
import { RouteNotFoundError } from "./errors";
import { Router } from "./router";

export const Request = (key: string): IController => {
    const controllerType = Router.Instance.routeTo(key);
    return controllerType
            .map((c) => createController(c))
            .orElse(() => {
                throw new RouteNotFoundError(key);
            });
};
