import Optional from "optional.js";
import { CalatravaControllerCtor, IController } from "./controller";
import { createController } from "./ControllerFactory";
import { RouteRedefineError } from "./errors";
import { INativeView } from "./nativeview";

class Route {
    constructor(
        public key: string,
        public calatravaControllerCtor: CalatravaControllerCtor) { }
}

// tslint:disable:max-classes-per-file
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

    public add(key: string, calatravaControllerCtor: CalatravaControllerCtor) {
        if (this.hasRoute(key)) {
            throw new RouteRedefineError(key);
        }
        this.routes.push(new Route(key, calatravaControllerCtor));
    }

    public routeTo(key: string): Optional<CalatravaControllerCtor> {
        return Optional
            .ofNullable(this.routes.find((route) => route.key === key))
            .map((route) => route.calatravaControllerCtor);
    }

    private getRoute(forKey: string): Optional<Route> {
        return Optional
            .ofNullable(this.routes.find((route) => route.key === forKey));
    }
}
