// tslint:disable:no-empty
import { IController } from "../controller";
import { EventHandler } from "../events";
import { INativeView } from "../nativeview";

export class FullMockController implements IController {

    public view: INativeView;

    public getValues(fields: string[]): Promise<string[]> { return Promise.resolve([]); }
    public render(model?: string) { }
    public renderComponent(name: string, model?: string) { }
    public display() { }
    public onBind(): Map<string, EventHandler> {
        return new Map<string, EventHandler>();
    }
    public onFinish() { }
    public onPageCreated() { }
    public onPageRestart() { }
    public onPageVisible() { }
}

export class MockNativeView implements INativeView {

    public bindAll(events: Map<string, (...args: any[]) => void>) {}
    public finish() {}
    public getValues(fields: string[], success: (data: string) => void, failure: (error: Error) => void) {}
    public hide() {}
    public render(viewModel: string, success: (data: boolean) => void, failure: (error: Error) => void) {}
    public renderComponent(
        name: string,
        model: string,
        success: (data: boolean) => void,
        failure: (error: Error) => void) {}
    public show() {}
    public onViewLoaded(callback: (...args: any[]) => void) {}
    public onViewVisible(callback: (...args: any[]) => void) {}
    public onViewDisappeared(callback: (...args: any[]) => void) {}
}
