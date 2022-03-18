import './App.css';

import { Routes, Route } from 'react-router-dom';




import Header from './Components/Header';
import Main from './Components/Main';

import { HomePage } from './Page/HomePage';

import Details from './Page/Details';
import NotFound from './Page/NotFound';

function App() {
  return (
    <>
      <Header />

      <Main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/country/:name" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
