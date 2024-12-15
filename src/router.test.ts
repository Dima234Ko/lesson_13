// __tests__/router.test.ts
import Router from '../src/router';

describe('Router', () => {
    let router: Router;

    beforeEach(() => {
        router = new Router({ mode: 'hash' });
        window.location.hash = ''; 
    });

    test('Добавление маршрута', () => {
        const route = {
            onEnter: jest.fn(),
        };
        router.addRoute('/home', route);
        expect(router['routes']).toHaveLength(1);
        expect(router['routes'][0].path).toBe('/home');
    });

    test('Переход по переданнаму маршруту', async () => {
        const onEnter = jest.fn();
        const route = {
            onEnter,
        };
        router.addRoute('/home', route);
        await router.navigate('/home');

        expect(onEnter).toHaveBeenCalled();
        expect(router['currentRoute']).toBe(route);
    });

    test('Переход по несуществующему маршруту', async () => {
        console.error = jest.fn();
        await router.navigate('/non-existent');

        expect(console.error).toHaveBeenCalledWith('Route not found: /non-existent');
    });

    test('Проверка вызова onLeave при смена маршрута', async () => {
        const onLeave = jest.fn();
        const onEnter1 = jest.fn();
        const onEnter2 = jest.fn();

        const route1 = { onLeave, onEnter: onEnter1 };
        const route2 = { onEnter: onEnter2 };

        router.addRoute('/home', route1);
        router.addRoute('/about', route2);

        await router.navigate('/home');
        await router.navigate('/about');

        expect(onLeave).toHaveBeenCalled();
    });

    test('Проверка вызова onbeforerender перед onEnter', async () => {
        const onBeforeEnter = jest.fn();
        const onEnter = jest.fn();
        const route = {
            onBeforeEnter,
            onEnter,
        };
    
        router.addRoute('/home', route);
        await router.navigate('/home');
    
        expect(onBeforeEnter).toHaveBeenCalled();
        expect(onEnter).toHaveBeenCalled();
    
        // Проверяем порядок вызова
        expect(onBeforeEnter.mock.invocationCallOrder[0]).toBeLessThan(onEnter.mock.invocationCallOrder[0]);
    });
    

    test('Обработка изменения хэша', async () => {
        const onEnter = jest.fn();
        router.addRoute('/home', { onEnter });

        window.location.hash = '#/home';
        await router.navigate('/home');

        expect(onEnter).toHaveBeenCalled();
    });

    test('Обработка события всплывающего состояния', async () => {
        const onEnter = jest.fn();
        router.addRoute('/home', { onEnter });

        window.history.pushState({}, '', '/home');
        await router.navigate('/home');

        expect(onEnter).toHaveBeenCalled();
    });

    test('Проверка устанавки слушателя события hashchange', async () => {
        const onEnter = jest.fn();
        router.addRoute('/home', { onEnter });

        router.init(); // Инициализируем маршрутизатор
        window.location.hash = '#/home'; // Изменяем хэш

        // Симулируем событие hashchange
        const event = new Event('hashchange');
        window.dispatchEvent(event);

        // Проверяем, что onEnter был вызван
        expect(onEnter).toHaveBeenCalled();
    });

    test('Переход по переданнаму маршруту, через регулярное выражение', async () => {
        const onEnter = jest.fn();
        const route = {
            onEnter,
        };
        // Регулярное выражение для маршрута, который соответствует /user/123
        router.addRoute(/^\/user\/\d+$/, route);

        window.location.hash = '#/user/123'; // Устанавливаем хэш
        router.init(); // Инициализируем маршрутизатор

        // Проверяем, что onEnter был вызван
        expect(onEnter).toHaveBeenCalled();
    });
});
