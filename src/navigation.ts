import Stack from "ts-data.stack";
import { IController } from "./controller";

export class NavigationStack {
    private static instance: NavigationStack;
    private stack: Stack<IController>;

    private constructor() {
        this.stack = new Stack<IController>();
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public push(controller: IController) {
        this.stack.push(controller);
    }

    public back() {
        this.stack.pop();
    }

    public top(): IController {
        return this.stack.peek();
    }

    public clear() {
        while ( !this.stack.isEmpty() ) { this.stack.pop(); }
    }

    public get count(): number {
        return this.stack.count();
    }
}

const Navigation = NavigationStack.Instance;
export default Navigation;
