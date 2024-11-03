
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from '~/layouts/DefaultLayout';
import { Fragment } from 'react';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './i18n';

function App() {
  return (
    <main className="App">
      <Router>
        {/* public routes */ }
        <Routes>
          { publicRoutes.map( ( route, index ) => {
            let Layout = DefaultLayout;
            if ( route.layout ) {
              Layout = route.layout;
            } else if ( route.layout === null ) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={ index }
                path={ route.path }
                element={
                  <Layout>
                    <Page/>
                  </Layout>
                }
              />
            )
          })}

          {/* We want to protect these routes */ }
          <Route element={ <PersistLogin /> }>
            { privateRoutes.map( ( route, index ) => {
              let Layout = DefaultLayout;

              if ( route.layout ) {
                Layout = route.layout;
      
              } else if ( route.layout === null ) {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route key={ index } element={ <RequireAuth allowedRoles={ route.allowedRoles } /> }>
                  <Route
                    path={ route.path }
                    element={
                      <Layout headerSearch={route.headerSearch}>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              )
            })}
          </Route>

          {/* Catch all */}
        </Routes>
      </Router>
      <ToastContainer />
    </main>
  );
}

export default App;
