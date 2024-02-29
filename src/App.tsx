import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AuthRequire } from './components/AuthRequire/AuthRequire';

const App = (): JSX.Element => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/profile"
          element={
            <AuthRequire>
              <ProfilePage />
            </AuthRequire>
          }
        ></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
