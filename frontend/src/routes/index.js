import config from '~/config';
import HomeLayout from '~/layouts/HomeLayout';
import LoginLayout from '~/layouts/LoginLayout';
import Conversations from '~/pages/Compose/Conversations';
import DoublePassages from '~/pages/Compose/DoublePassages';
import IncompleteSentences from '~/pages/Compose/IncompleteSentences';
import Photos from '~/pages/Compose/Photos';
import QuestionResponse from '~/pages/Compose/QuestionResponse';
import ShortTalks from '~/pages/Compose/ShortTalks';
import SinglePassages from '~/pages/Compose/SinglePassages';
import TextCompletion from '~/pages/Compose/TextCompletion';
import TriplePassages from '~/pages/Compose/TriplePassages';
import Home from '~/pages/Home';
import { Admin, Editor, User } from '~/pages/HomeHasLogged';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Unauthorized from '~/pages/Unauthorized';

const publicRoutes = [
  { path: config.routes.register, component: Register, layout: LoginLayout },
  { path: config.routes.home.default, component: Home, layout: HomeLayout },
  { path: config.routes.login, component: Login, layout: LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
];

const privateRoutes = [
  {
    path: config.routes.home.admin,
    component: Admin,
    allowedRoles: [config.roles.admin],
    layout: HomeLayout,
  },
  {
    path: config.routes.home.editor,
    component: Editor,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.home.user,
    component: User,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
  },

  // compose
  {
    path: config.routes.compose.part1_Photos,
    component: Photos,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part2_QuestionResponse,
    component: QuestionResponse,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part3_Conversations,
    component: Conversations,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part4_ShortTalks,
    component: ShortTalks,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part5_IncompleteSentences,
    component: IncompleteSentences,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part6_TextCompletion,
    component: TextCompletion,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part7_SinglePassages,
    component: SinglePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part7_DoublePassages,
    component: DoublePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.compose.part7_TriplePassages,
    component: TriplePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
];

export { publicRoutes, privateRoutes };
