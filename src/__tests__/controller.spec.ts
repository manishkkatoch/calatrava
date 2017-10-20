// tslint:disable-next-line:no-reference
/// <reference path="./jasmine.matcher.d.ts" />

import {} from "jasmine";
import { createController, IController } from "../controller";
import { customMatchers } from "./jasmine.matcher";

class TestController implements IController {
    public recievedArguments: any[];
    constructor(...args: any[]) {
        this.recievedArguments = args;
    }
}

describe("Calatava.Controller", () => {
    beforeEach(() => {
        jasmine.addMatchers(customMatchers);
    });
    it("#createController should create instance of controller with given args",
     () => {
        const result = createController(TestController, {arg1: "1", arg2: "2"});
        expect(result).toBeInstanceOf(TestController);
    });
});
