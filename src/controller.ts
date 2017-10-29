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

export type CalatravaControllerCtor = new (nativeView: INativeView, ...args: any[]) => IController;

export class BaseController implements IController {
    public readonly view: INativeView;
    constructor(view: INativeView, ...args: any[]) {
        this.view = view;
        // tslint:disable:no-console
        this.view.onViewLoaded(this.onPageCreated);
        this.view.onViewVisible(() => {
            this.view.bindAll(this.onBind());
            this.onPageVisible();
        });
        this.view.onViewDisappeared(this.onFinish);
    }

    public getValues(fields: string[]): Promise<string[]> {
        return makePromise((success: Success<string[]>, failure: Failure) => {
            const wrappedSuccess = (data: string): void => {
                try {
                    success(JSON.parse(data));
                } catch (e) {
                    failure(e);
                }
            };
            this.view.getValues(fields, wrappedSuccess, failure );
        });
    }
    public render(model?: string): Promise<{}> {
        if ( typeof model === "undefined" ) {
            return Promise.reject("Model not present");
        }
        return this.renderOnNativeView(model);
    }

    public renderComponent(name: string, model?: string): Promise<{}> {
        if ( typeof model === "undefined" ) {
            return Promise.reject("Model not present");
        }
        return this.renderComponentOnNativeView(name, model);
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
    // tslint:disable:no-empty
    public onPageCreated() { }
    public onPageRestart() { }
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
