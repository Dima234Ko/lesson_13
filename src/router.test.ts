import Router from "./router";

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router({ mode: "hash" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).window = {
      location: {
        hash: "",
      },
      history: {
        pushState: jest.fn(),
      },
    };
  });

  test("тест добавления маршрута", () => {
    const route = {
      onEnter: jest.fn(),
    };
    router.addRoute("/home", route);
    expect(router["routes"]).toHaveLength(1);
    expect(router["routes"][0].path).toBe("/home");
  });

  test("тест перехода по маршруту", async () => {
    const onEnter = jest.fn();
    const route = {
      onEnter,
    };
    router.addRoute("/home", route);

    await router.navigate("/home");

    expect(onEnter).toHaveBeenCalled();
  });

  test("тест перехода на несуществующий маршрут", async () => {
    console.error = jest.fn();
    await router.navigate("/non-existing");

    expect(console.error).toHaveBeenCalledWith(
      "Route not found: /non-existing",
    );
  });

  test("тест совпадения указанного пути с добавленным маршрутом", () => {
    router.addRoute("/home", { onEnter: jest.fn() });
    expect(router.matchRoute("/home", "/home")).toBe(true);
    expect(router.matchRoute("/home", "/about")).toBe(false);
  });

  test("тест на соответствие переданного параметра регулярному выраженю", () => {
    router.addRoute(/^\/user\/(\d+)$/, { onEnter: jest.fn() });
    expect(router.matchRoute(/^\/user\/(\d+)$/, "/user/123")).toBe(true);
    expect(router.matchRoute(/^\/user\/(\d+)$/, "/user/abc")).toBe(false);
  });

  test("тест на извлечение параметров из строкового маршрута", () => {
    const route = "/user/:id";
    const params = router.extractParams(route, "/user/123");
    expect(params).toEqual({ id: "123" });
  });

  test("тест на передачу пустого значения в роутер", () => {
    const route = /^\/(.+)$/;
    const params = router.extractParams(route, "");
    expect(params).toEqual(undefined);
  });

  test("тест для проверки, что хуки жизненного цикла маршрутов правильно вызываются в процессе навигации", async () => {
    const onLeave = jest.fn();
    const onBeforeEnter = jest.fn();
    const onEnter = jest.fn();

    const route1 = { onLeave, onBeforeEnter, onEnter };
    const route2 = { onLeave: jest.fn(), onEnter: jest.fn() };

    router.addRoute("/home", route1);
    router.addRoute("/about", route2);

    await router.navigate("/home");
    expect(onEnter).toHaveBeenCalled();

    await router.navigate("/about");
    expect(onLeave).toHaveBeenCalled();
    expect(onBeforeEnter).toHaveBeenCalled();
    expect(route2.onEnter).toHaveBeenCalled();
  });
});
