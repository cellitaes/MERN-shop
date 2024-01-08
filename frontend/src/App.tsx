import Routes from './Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainHeader from './shared/components/Navigation/MainHeader';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import { persistor, store } from './store/store';

import './styles/main.scss';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainHeader>
                        <MainNavigation />
                    </MainHeader>
                    <Routes />
                </PersistGate>
            </Provider>
        </div>
    );
}

export default App;
