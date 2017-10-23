import {} from "jest";
import { NativeViewNotFoundError } from "../errors";

import { FullMockController } from "../__mocks__/mockcreator";
import { IController } from "../controller";

jest.mock("../index");
// tslint:disable-next-line:ordered-imports
import { createController } from "../controllerfactory";
import { Calatrava } from "../index";

describe("Calatava.ControllerFactory", () => {
    let mockController: IController;
    beforeEach(() => {
        mockController = createController(FullMockController);
    });
    it("#createController should create instance of controller for given type",
     () => {
        expect(mockController)
            .toBeInstanceOf(FullMockController);
    });
    it("#createController should get nativ eview by convention (controller name)", () => {
        expect(Calatrava.NativePlatform.getPage)
            .toBeCalledWith("FullMockController");
    });
    it("#constructor should throw error if no corresponding native view", () => {
        Calatrava.NativePlatform.getPage = jest.fn();
        expect(() => {
            mockController = createController(FullMockController);
        }).toThrowError(NativeViewNotFoundError);
    });
});
