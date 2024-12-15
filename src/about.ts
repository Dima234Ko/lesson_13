// src/about.ts
import router from "./routerInstance";

const aboutRoute = {
  onEnter: () => {
    document.body.innerHTML = `
            <h1>О нас</h1>
            <button id="homeBtn">Перейти на страницу "Главная"</button>
        `;
    document.getElementById("homeBtn")!.addEventListener("click", () => {
      router.navigate("/");
    });
  },
};

export default aboutRoute;
