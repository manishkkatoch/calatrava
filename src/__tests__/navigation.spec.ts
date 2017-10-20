import { IController } from "../controller";
import { default as Navigation, NavigationStack } from "../navigation";

class OneController implements IController { }
class TwoController implements IController { }

describe("Calatrava.Navigation", () => {
    let oneController: OneController;
    let twoController: TwoController;
    beforeEach(() => {
        oneController = new OneController();
        twoController = new TwoController();
        Navigation.clear();
    });
    it("#Instance should allow only one instance to be created", () => {
        const instanceOne = NavigationStack.Instance;
        const instanceTwo = NavigationStack.Instance;
        expect(instanceOne).toEqual(instanceTwo);
    });
    it("#push should be able to add multiple controllers to stack", () => {
        Navigation.push(oneController);
        Navigation.push(twoController);
        expect(Navigation.count).toEqual(2);
    });
    it("#back should be able to go back to earlier controller in stack", () =>{
        Navigation.push(oneController);
        Navigation.push(twoController);
        Navigation.back();
        expect(Navigation.count).toEqual(1);
    });
    it("#top should be able to see topmost controller", () => {
        Navigation.push(oneController);
        Navigation.push(twoController);
        expect(Navigation.top()).toBeInstanceOf(TwoController);
        Navigation.back();
        expect(Navigation.top()).toBeInstanceOf(OneController);
    });
    it("#top should not remove topmost controller", () => {
        Navigation.push(oneController);
        Navigation.push(twoController);
        Navigation.top();
        expect(Navigation.count).toEqual(2);
    });
    it("#clear should be able to clear the entire stack", () => {
        Navigation.push(oneController);
        Navigation.push(twoController);
        Navigation.clear();
        expect(Navigation.count).toEqual(0);
    });
});
