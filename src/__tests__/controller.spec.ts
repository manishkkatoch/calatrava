import {} from "jest";
import { rejectingFunc, resolvingFunc } from "./helper";

jest.mock("../index");
jest.mock("../navigation");

import { BaseController, IController } from "../controller";
import { createController } from '../controllerfactory';
import Navigation from "../navigation";

describe("Calatrava.BaseController", () => {
    let mockController: IController;

    beforeEach(() => {
        mockController = createController(BaseController);
    });

    it("#view should have native view set.", () => {
        expect(mockController).toBeInstanceOf(BaseController);
        expect(mockController.view).toBeDefined();
    });

    it("#getValues should resolve if view can provide values asked.",
        async () => {
            const request = ["field1", "field2"];
            const response = ["value1", "value2"];

            mockController.view.getValues = resolvingFunc(JSON.stringify(response));

            await expect(mockController.getValues(request))
                .resolves.toEqual(response);
    });

    it("#getValues should reject if view cannot provide values asked.",
        async () => {
            const request = ["field1", "field2"];
            const response = "no values";

            mockController.view.getValues = rejectingFunc(response);
            await expect(mockController.getValues(request))
                .rejects.toMatch(response);
    });

    it("#render should resolve view to render if model present",
        async () => {
            const model = { key: "value" };

            mockController.view.render = resolvingFunc(true);
            await expect(mockController.render(JSON.stringify(model)))
                .resolves.toBeTruthy();
    });

    it("#render should reject if model is absent",
        async () => {
            const model = undefined;
            const response = "Model not present";
            mockController.view.render = resolvingFunc(true);
            await expect(mockController.render(undefined))
                .rejects.toMatch(response);
    });
    it("#render should resolve if view is able to render",
        async () => {
            const model = { key: "value" };

            mockController.view.render = resolvingFunc(true);
            await expect(mockController.render(JSON.stringify(model)))
                .resolves.toBeTruthy();
            expect(mockController.view.render).toBeCalled();
    });
    it("#render should reject if view is unable to render",
        async () => {
            const model = { key: "value" };
            const errorResponse = "rendering error";

            mockController.view.render = rejectingFunc(errorResponse);
            await expect(mockController.render(JSON.stringify(model)))
                .rejects.toMatch(errorResponse);
            expect(mockController.view.render).toBeCalled();
    });
    it("#renderComponent should reject if model is absent",
        async () => {
            const name = "component";
            const model = undefined;
            const response = "Model not present";

            mockController.view.renderComponent = resolvingFunc(true);
            await expect(mockController.renderComponent(name, model))
                .rejects.toMatch(response);
    });
    it("#renderComponent should resolve if view is able to render a component",
        async () => {
            const name = "component";
            const model = { key: "value" };

            mockController.view.renderComponent = resolvingFunc(true);
            await expect(mockController.renderComponent(name, JSON.stringify(model)))
                .resolves.toBeTruthy();
            expect(mockController.view.renderComponent).toBeCalled();
    });
    it("#renderComponent should reject if view is unable to render a component",
        async () => {
            const name = "component";
            const model = { key: "value" };
            const errorResponse = "rendering error";

            mockController.view.renderComponent = rejectingFunc(errorResponse);
            await expect(mockController.renderComponent(name, JSON.stringify(model)))
                .rejects.toMatch(errorResponse);
            expect(mockController.view.renderComponent).toBeCalled();
    });
    it("#display should call native view's show", () => {
        mockController.view.show = jest.fn();
        mockController.display();
        expect(mockController.view.show).toBeCalled();
    });
    it("#onFinish should call Navigation's back", () => {
        mockController.onFinish();
        expect(Navigation.back).toBeCalled();
    });
});
