// tslint:disable-next-line:no-empty-interface
export interface IController {}

export interface ControllerCreator<T extends IController> {
    new(...args: any[]): T;
}

export function createController<T extends IController>(
    ctor: ControllerCreator<T>,
    ...args: any[]): T {
    return new ctor(...args);
}
