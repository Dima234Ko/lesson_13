// src/index.ts
import router from './routerInstance'; // Импортируем общий экземпляр роутера

router.addRoute('/', {
    onEnter: () => {
        document.body.innerHTML = `
            <h1>Главная</h1>
            <button id="aboutBtn">Перейти на страницу "О нас"</button>
        `;
        document.getElementById('aboutBtn')!.addEventListener('click', async () => {
            // Динамически загружаем about.ts при клике на кнопку
            const { default: aboutRoute } = await import('./about');
            router.addRoute('/about', aboutRoute); // Добавляем маршрут
            router.navigate('/about'); // Переход на страницу "О нас"
        });
    }
});

// Инициализация роутера
router.init(); // Инициализация роутера
