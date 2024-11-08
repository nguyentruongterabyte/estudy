import config from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout';
import HomeLayout from '~/layouts/HomeLayout';
import LoginLayout from '~/layouts/LoginLayout';
import Home from '~/pages/Home';
import { Admin, Editor, User } from '~/pages/HomeHasLogged';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Unauthorized from '~/pages/Unauthorized';

const publicRoutes = [
  { path: config.routes.register, component: Register, layout: LoginLayout },
  { path: config.routes.home, component: Home, layout: HomeLayout },
  { path: config.routes.login, component: Login, layout: LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
];

const privateRoutes = [
  {
    path: config.routes.adminHome,
    component: Admin,
    allowedRoles: [config.roles.admin],
    layout: HomeLayout,
  },
  {
    path: config.routes.editorHome,
    component: Editor,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.userHome,
    component: User,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
  },
];

export { publicRoutes, privateRoutes };
