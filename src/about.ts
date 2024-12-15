// src/about.ts
import router from './routerInstance'; // Импортируем общий экземпляр роутера

// src/about.ts
const aboutRoute = {
    onEnter: () => {
        document.body.innerHTML = `
            <h1>О нас</h1>
            <button id="homeBtn">Вернуться на главную страницу</button>
        `;
        document.getElementById('homeBtn')!.addEventListener('click', () => {
            router.navigate('/');
        });
    }
};

export default aboutRoute; // Экспортируем маршрут

