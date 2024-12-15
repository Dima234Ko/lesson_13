// src/router.ts
type RouteHandler = (params?: { [key: string]: string }) => Promise<void> | void;

interface Route {
    onBeforeEnter?: RouteHandler;
    onEnter: RouteHandler;
    onLeave?: RouteHandler;
}

interface RouteConfig {
    path: string | RegExp | ((path: string) => boolean);
    route: Route;
}

class Router {
    private routes: RouteConfig[] = [];
    private mode: 'hash' | 'history';
    private currentRoute: Route | null = null;

    constructor(options: { mode: 'hash' | 'history' }) {
        this.mode = options.mode;
    }

    addRoute(path: string | RegExp | ((path: string) => boolean), route: Route) {
        this.routes.push({ path, route });
    }

    async navigate(path: string) {
        const routeConfig = this.routes.find(({ path: routePath }) => this.matchRoute(routePath, path));
        if (!routeConfig) {
            console.error(`Route not found: ${path}`);
            return;
        }
    
        const { route } = routeConfig;
    
        // Вызов onLeave для текущего маршрута, если он есть
        if (this.currentRoute && this.currentRoute.onLeave) {
            await this.currentRoute.onLeave();
        }
    
        // Вызов onBeforeEnter, если он есть
        if (route.onBeforeEnter) {
            await route.onBeforeEnter();
        }
    
        // Установка текущего маршрута
        this.currentRoute = route;
    
        // Вызов onEnter
        await route.onEnter();
    
        // Обновление URL
        this.push(path); // Обновляем URL после перехода
    }
    

    matchRoute(routePath: string | RegExp | ((path: string) => boolean), path: string): boolean {
        if (typeof routePath === 'string') {
            return routePath === path;
        } else if (routePath instanceof RegExp) {
            return routePath.test(path);
        } else if (typeof routePath === 'function') {
            return routePath(path);
        }
        return false;
    }

    init() {
        if (this.mode === 'hash') {
            const hash = window.location.hash.replace('#', '') || '/';
            window.addEventListener('hashchange', () => {
                const newHash = window.location.hash.replace('#', '');
                this.navigate(newHash);
            });
            this.navigate(hash);
        } else if (this.mode === 'history') {
            window.addEventListener('popstate', () => {
                this.navigate(window.location.pathname);
            });
            this.navigate(window.location.pathname);
        }
    }

    push(path: string) {
        if (this.mode === 'hash') {
            window.location.hash = path;
        } else if (this.mode === 'history') {
            window.history.pushState({}, '', path);
            this.navigate(path);
        }
    }
}

export default Router;
