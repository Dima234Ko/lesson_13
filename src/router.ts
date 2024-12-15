// src/router.ts
type Route = {
    onEnter: () => void;
};

class Router {
    private routes: { [key: string]: Route } = {};
    private mode: string;

    constructor(options: { mode: string }) {
        this.mode = options.mode;
    }

    addRoute(path: string, route: Route) {
        this.routes[path] = route;
    }

    navigate(path: string) {
        if (this.routes[path]) {
            this.routes[path].onEnter();
        } else {
            console.error(`Route not found: ${path}`);
        }
    }

    init() {
        const hash = window.location.hash.replace('#', '') || '/';
        window.addEventListener('hashchange', () => {
            const newHash = window.location.hash.replace('#', '');
            this.navigate(newHash);
        });
        this.navigate(hash); // Удалите этот вызов, чтобы не инициализировать при загрузке
    }
}

export default Router;
