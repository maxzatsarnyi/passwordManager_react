import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Nav } from './components/Nav/Nav';
import { Routes } from './routes/index';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Nav />
        <Routes />
        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Suspense>
  );
}

export default App;
