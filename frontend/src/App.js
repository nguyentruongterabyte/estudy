import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment } from 'react';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Error from './pages/Error';

function App() {
  const { t } = useTranslation();

  return (
    <main className="App">
      <Router>
        {/* public routes */}
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {/* We want to protect these routes */}
          <Route element={<PersistLogin />}>
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route key={index} element={<RequireAuth allowedRoles={route.allowedRoles} />}>
                  <Route
                    path={route.path}
                    element={
                      <Layout headerSearch={route.headerSearch}>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}
          </Route>

          {/* Catch all */}
          <Route
            path="*"
            element={<Error errorCode={404} message={t('not_found_message')} goBackTitle={t('go_back')} />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </main>
  );
}

export default App;
