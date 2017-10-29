import {} from "jest";
import { CalatravaControllerCtor, IController } from "../controller";
import { RouteNotFoundError } from "../errors";
import Navigation from "../navigation";
import { Router } from "../router";

jest.mock("../index");
import { Request } from "../request";

const mockControllerCtorFunction: CalatravaControllerCtor = jest.fn();

describe("Calatrava.Request", () => {
    beforeEach(() => {
        Router.Instance.clear();
        Navigation.clear();
    });

    it("#call should update navigation for found route",
    () => {
        Router.Instance.add("key1", mockControllerCtorFunction);
        const result = Request("key1", []);
        expect(Navigation.top()).toBeInstanceOf(mockControllerCtorFunction);
    });

    it("#call should throw RouteNotFoundError if no route for requested key", () => {
        expect(() => {
            Request("someController", []);
        })
        .toThrowError(RouteNotFoundError);
    });
});
