// src/index.ts
import router from "./routerInstance";

router.addRoute("/", {
  onEnter: () => {
    document.body.innerHTML = `
            <h1>Главная</h1>
            <button id="aboutBtn">Перейти на страницу "О нас"</button>
        `;
    document.getElementById("aboutBtn")!.addEventListener("click", async () => {
      const { default: aboutRoute } = await import("./about");
      router.addRoute("/about", aboutRoute);
      router.navigate("/about");
    });
  },
});

router.init();
