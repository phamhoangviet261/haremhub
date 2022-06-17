- npm i redux react-redux
- Create store.js file -> import, create and export store

- Create reducer.js file -> create reducer function

- Go to index.js file
    import store from './redux/store'
    import {Provider} from 'react-redux'

Wrap App component with <Provider store={store}>.....</Provider> component

- Create actions.js file to definition action with type and payload.

- Go to component need to call action
    import { useDispatch } from 'react-redux'
    import action need to call

    const dispatch = useDispatch();
    call dispatch to call action:
    dispatch(action(data));

- npm i redux-devtools-extension
Go to store.js file, write:
    import { composeWithDevTools } from 'redux-devtools-extension';
    const composedEnhancer = composeWithDevTools()
    const store = createStore(rootReducer, composedEnhancer);