import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { loginInputs, registerInputs } from 'formData';
import {
  Dashboard,
  ForgotPassword,
  Login,
  NotFound,
  Register,
  ResetPassword,
  SharedLayout,
} from 'pages';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<SharedLayout />}>
              <Route
                index
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
              <Route
                path='login'
                element={
                  <ProtectedRoute>
                    <Login loginInputs={loginInputs} />
                  </ProtectedRoute>
                }
              />
              <Route
                path='register'
                element={
                  <ProtectedRoute>
                    <Register registerInputs={registerInputs} />
                  </ProtectedRoute>
                }
              />
              <Route
                path='forgot'
                element={
                  <ProtectedRoute>
                    <ForgotPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path='reset-password/:token'
                element={
                  <ProtectedRoute>
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
