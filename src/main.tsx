import { createRoot } from 'react-dom/client'
import App from './components/app/App'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.scss'

createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
		<App />
		</Provider>
  </>
)
