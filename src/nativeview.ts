import { EventHandler, Failure, GenericCallBack, Success } from "./events";

export interface INativeView {
    bindAll(events: Map<string, EventHandler>);
    finish();
    getValues(fields: string[], success: Success<string>, failure: Failure);
    hide();
    render(viewModel: string, success: Success<boolean>, failure: Failure);
    renderComponent(name: string, model: string, success: Success<boolean>, failure: Failure);
    show();
    onViewLoaded(callback: GenericCallBack);
    onViewVisible(callback: GenericCallBack);
    onViewDisappeared(callback: GenericCallBack);
}
