// src/about.test.ts
import router from "./routerInstance";
import aboutRoute from "./about";

describe("About Route", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("Вывод содержимого", () => {
    aboutRoute.onEnter();
    const heading = document.querySelector("h1");
    expect(heading).not.toBeNull();
    expect(heading!.textContent).toBe("О нас");
    const button = document.getElementById("homeBtn");
    expect(button).not.toBeNull();
    expect(button!.textContent).toBe('Перейти на страницу "Главная"');
  });

  test("Переход при нажатии кнопки", () => {
    const navigateSpy = jest.spyOn(router, "navigate");
    aboutRoute.onEnter();
    const button = document.getElementById("homeBtn");
    button!.click();
    expect(navigateSpy).toHaveBeenCalledWith("/");
    navigateSpy.mockRestore();
  });
});
