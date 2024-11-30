import config from '~/config';
import HomeLayout from '~/layouts/HomeLayout';
import LoginLayout from '~/layouts/LoginLayout';
import Conversations from '~/pages/Conversations';
import DoublePassages from '~/pages/DoublePassages';
import IncompleteSentences from '~/pages/IncompleteSentences';
import Photos from '~/pages/Photos';
import QuestionResponse from '~/pages/QuestionResponse';
import ShortTalks from '~/pages/ShortTalks';
import SinglePassages from '~/pages/SinglePassages';
import TextCompletion from '~/pages/TextCompletion';
import TriplePassages from '~/pages/TriplePassages';
import Home from '~/pages/Home';
import { Admin, Editor, User } from '~/pages/HomeHasLogged';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Unauthorized from '~/pages/Unauthorized';
import Vocabulary from '~/pages/Vocabulary';

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

  // compose question
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
  // practice question
  {
    path: config.routes.practice.part1_Photos,
    component: Photos,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part2_QuestionResponse,
    component: QuestionResponse,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part3_Conversations,
    component: Conversations,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part4_ShortTalks,
    component: ShortTalks,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part5_IncompleteSentences,
    component: IncompleteSentences,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part6_TextCompletion,
    component: TextCompletion,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part7_SinglePassages,
    component: SinglePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part7_DoublePassages,
    component: DoublePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.practice.part7_TriplePassages,
    component: TriplePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },

  // vocabulary
  {
    path: config.routes.vocabulary.compose,
    component: Vocabulary,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
  },
];

export { publicRoutes, privateRoutes };
