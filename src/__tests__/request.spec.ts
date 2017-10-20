import { IController } from "../controller";
import { RouteNotFoundError } from "../errors";
import { Request } from "../request";
import { Router } from "../router";
import {} from "./jasmine.matcher";

class TestController implements IController {}

describe("Calatrava.Request", () => {
    it("#call should return controller for a given key with route registered",
    () => {
        Router.Instance.add("key", TestController);
        const result = Request("key");
        expect(result).toBeInstanceOf(TestController);
    });

    it("#call should return instance of requested route controller", () => {
        expect(Request("someController"))
            .toThrowError(RouteNotFoundError);
    });
});
