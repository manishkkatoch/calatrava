import Optional from "optional.js";
import { IController } from "./controller";
import { RouteRedefineError } from "./errors";
// consider typed args
export interface IControllerType {
    new(...args: any[]): IController;
}

class Route {
    constructor(public key: string, public controller: IControllerType) { }
}

export class Router {
    private static instance: Router;
    private routes: Route[];
    private constructor() {
        this.routes = [];
    }
    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public get RouteCount(): number {
        return this.routes.length;
    }

    public clear() {
        this.routes.length = 0;
    }

    public hasRoute(key: string): boolean {
        return this.getRoute(key).isPresent();
    }

    public add(key: string, controllerType: IControllerType) {
        if (this.hasRoute(key)) {
            throw new RouteRedefineError(key);
        }
        this.routes.push(new Route(key, controllerType));
    }

    public routeTo(key: string): Optional<IControllerType> {
        return Optional
            .ofNullable(this.routes.find((route) => route.key === key))
            .map((route) => route.controller);
    }

    private getRoute(forKey: string): Optional<Route> {
        return Optional
            .ofNullable(this.routes.find((route) => route.key === forKey));
    }
}
