import { IController } from "../controller";
import { RouteNotFoundError } from "../errors";
import Navigation from "../navigation";
import { Request } from "../request";
import { Router } from "../router";
import {} from "./jasmine.matcher";

class TestController implements IController {}

describe("Calatrava.Request", () => {
    beforeEach(() => {
        Router.Instance.clear();
        Navigation.clear();
    });

    it("#call should update navigation for found route",
    () => {
        Router.Instance.add("key", TestController);
        const result = Request("key");
        expect(Navigation.top()).toBeInstanceOf(TestController);
    });

    it("#call should thow if no route for requested key", () => {
        expect(() => {
            Request("someController");
        })
        .toThrowError(RouteNotFoundError);
    });
});
