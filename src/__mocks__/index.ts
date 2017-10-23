import {} from "jest";
import Optional from "optional.js";
import { NativePlatform } from "../";
import { INativeView } from "../nativeview";
import { IPlatform } from "../platform";

export const MockNativeView = jest.fn<INativeView>(() => ({
    bindAll: jest.fn(),
    getValues: jest.fn(),
    render: jest.fn(),
    renderComponent: jest.fn(),
    show: jest.fn(),
    hide: jest.fn(),
    finish: jest.fn(),
    onViewLoaded: jest.fn(),
    onViewVisible: jest.fn(),
    onViewDisappeared: jest.fn(),
}));

export const Calatrava = {
    NativePlatform: jest.fn<IPlatform>( () => ({
        getPage: jest.fn((name: string) => new MockNativeView()),
    }))(),
};
