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
