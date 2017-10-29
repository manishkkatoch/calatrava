import {} from "jest";
import { NativeViewNotFoundError } from "../errors";

import { FullMockController } from "../__mocks__/mockcreator";
import { CalatravaControllerCtor, IController } from "../controller";

jest.mock("../index");
// tslint:disable-next-line:ordered-imports
import { createController } from "../controllerfactory";
import { Calatrava } from "../index";
import { INativeView } from "../nativeview";

describe("Calatava.ControllerFactory", () => {
    let mockController: IController;
    let mockControllerCtor: CalatravaControllerCtor = FullMockController;

    beforeEach(() => {
        mockController = createController(mockControllerCtor, "key1");
    });

    it("#createController should create instance of controller for given type",
     () => {
        expect(mockController)
            .toBeInstanceOf(FullMockController);
    });
    it("#createController should get native view by the name passed while creating controller", () => {
        expect(Calatrava.NativePlatform.getPage)
            .toBeCalledWith("key1");
    });
    it("#constructor should throw error if no corresponding native view", () => {
        Calatrava.NativePlatform.getPage = jest.fn();
        expect(() => {
            mockController = createController(mockControllerCtor, "key1");
        }).toThrowError(NativeViewNotFoundError);
    });
});
