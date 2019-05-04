import App from './containers/AppContainer';
import {locale} from './translations/en';
import render from './source/utils/render';

const _global = (window /* browser */ || global /* node */) as any;
_global.loc = function (key: string): string {
    return (<any>locale)[key] || key;
};

(function () {
    render(App);

    if (module.hot) {
        module.hot.accept('./containers/AppContainer', () => {
            const NextApp = require('./containers/AppContainer').default;
            render(NextApp);
        });
    }
})();