import Routes from './Routes';
import { Provider } from 'react-redux';

import MainHeader from './shared/components/Navigation/MainHeader';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import { store } from './store/store';

import './styles/main.scss';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <MainHeader>
                    <MainNavigation />
                </MainHeader>
                <Routes />
            </Provider>
        </div>
    );
}

export default App;
