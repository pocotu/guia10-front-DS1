import AppRoutes from './routes/index.jsx';
import { AppProvider } from './context/index.jsx';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
