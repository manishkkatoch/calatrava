import Optional from "optional.js";
import { EventHandler, Failure, makePromise, Resolver, Success } from "./events";
import { INativeView } from "./nativeview";
import Navigation from "./navigation";

export interface IController {
    readonly view: INativeView;
    getValues(fields: string[]): Promise<string[]>;
    render(model?: string);
    renderComponent(name: string, model?: string);
    display();
    onBind(): Map<string, EventHandler>;
    onFinish();
    onPageCreated();
    onPageRestart();
    onPageVisible();
}

export class BaseController implements IController {
    public readonly view: INativeView;
    constructor(view: INativeView, ...args: any[]) {
        this.view = view;
    }

    public getValues(fields: string[]): Promise<string[]> {
        return makePromise((success: Success<string[]>, failure: Failure) => {
            const wrappedSuccess = (data: string): void => {
                success(JSON.parse(data));
            };
            this.view.getValues(fields, wrappedSuccess, failure );
        });
    }
    public render(model?: string): Promise<{}> {
        const nullableModel = Optional.ofNullable(model);

        if ( !nullableModel.isPresent() ) {
            return Promise.reject("Model not present");
        }

        return nullableModel
                .map((m) => this.renderOnNativeView(m))
                .get();
    }

    public renderComponent(name: string, model?: string): Promise<{}> {
        const nullableModel = Optional.ofNullable(model);

        if ( !nullableModel.isPresent() ) {
            return Promise.reject("Model not present");
        }

        return nullableModel
                .map((modelUnwrapped) =>
                    this.renderComponentOnNativeView(name, modelUnwrapped))
                .get();
    }

    public display() {
        this.view.show();
    }
    public onBind(): Map<string, EventHandler> {
        return new Map<string, EventHandler>();
    }
    public onFinish() {
        this.back();
    }
    // tslint:disable-next-line:no-empty
    public onPageCreated() { }
    // tslint:disable-next-line:no-empty
    public onPageRestart() { }
    // tslint:disable-next-line:no-empty
    public onPageVisible() { }

    private back() {
        Navigation.back();
    }

    private renderOnNativeView(model: string): Promise<boolean> {
        return makePromise((success: Success<boolean>, failure: Failure) => {
            this.view.render(model, success, failure);
        });
    }

    private renderComponentOnNativeView(name: string, model: string):
        Promise<boolean> {
        return makePromise((success: Success<boolean>, failure: Failure) => {
            this.view.renderComponent(name, model, success, failure);
        });
    }
}
