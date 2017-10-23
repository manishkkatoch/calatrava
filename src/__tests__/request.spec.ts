import {} from "jest";
import { IController } from "../controller";
import { RouteNotFoundError } from "../errors";
import Navigation from "../navigation";
import { Router } from "../router";

jest.mock("../index");
import { Request } from "../request";

const MockController = jest.fn<IController>();

describe("Calatrava.Request", () => {
    beforeEach(() => {
        Router.Instance.clear();
        Navigation.clear();
    });

    it("#call should update navigation for found route",
    () => {
        Router.Instance.add("key", MockController);
        const result = Request("key");
        expect(Navigation.top()).toBeInstanceOf(MockController);
    });

    it("#call should thow if no route for requested key", () => {
        expect(() => {
            Request("someController");
        })
        .toThrowError(RouteNotFoundError);
    });
});
