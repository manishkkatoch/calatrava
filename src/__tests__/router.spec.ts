import { IController } from "../controller";
import { RouteRedefineError } from "../errors";
import { Router } from "../router";

class TestController implements IController { }
class AnotherTestController implements IController { }

describe("Calatrava.Router", () => {
    let router: Router;

    beforeEach(() => {
        router = Router.Instance;
        router.clear();
    });

    it("#allRoutes should have empty routes at start", () => {
            expect(router.RouteCount).toEqual(0);
        });

    it("#add should be able to add a route given a controller and key", () => {
        router.add("someController", TestController);
        expect(router.RouteCount).toEqual(1);
    });

    it("#add should throw error if trying to re-register for a key", () => {
        router.add("someController", TestController);
        expect(() => {
            router.add("someController", AnotherTestController);
        }).toThrowError(RouteRedefineError);
    });

    it("#routeTo should return a controllerType given valid key", () => {
        router.add("someController", TestController);
        const controllerType = router.routeTo("someController");
        expect(controllerType.isPresent()).toBeTruthy();
        expect(controllerType.get()).toBe(TestController);
    });
});
