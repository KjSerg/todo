import { detectBrowser } from './_helpers';
import TODO from './components/_CreateLists';


class Application {
    constructor() {
        Application.init();
    }

    static initializePlugins() {
        // INIT YOUR PLUGINS
    };

    static initializeModules() {
        const list = new TODO();
    };

    static detectBrowser() {
        document.body.setAttribute('data-browser', detectBrowser());
    }

    static init() {
        this.detectBrowser();
        this.initializePlugins();
        this.initializeModules();
    }
};

const App = new Application();