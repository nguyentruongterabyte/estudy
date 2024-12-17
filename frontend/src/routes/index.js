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
import Grammar from '~/pages/Grammar';
import Profile from '~/pages/Profile';
import PasswordChanging from '~/pages/PasswordChanging';
import AccountManager from '~/pages/AccountManager';
import EditorAccountCreation from '~/pages/EditorAccountCreation';
import Analytics from '~/pages/Analytics';
import LearningResult from '~/pages/LearningResult';

const publicRoutes = [
  { path: config.routes.register, component: Register, layout: LoginLayout },
  { path: config.routes.home.default, component: Home, layout: HomeLayout },
  { path: config.routes.login, component: Login, layout: LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
];

const privateRoutes = [
  {
    path: config.routes.learningResult,
    component: LearningResult,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
  },
  {
    path: config.routes.analytics,
    component: Analytics,
    allowedRoles: [config.roles.admin],
    layout: HomeLayout,
  },
  {
    path: config.routes.createEditorAccount,
    component: EditorAccountCreation,
    allowedRoles: [config.roles.admin],
    layout: HomeLayout,
  },
  {
    path: config.routes.accountManager,
    component: AccountManager,
    allowedRoles: [config.roles.admin],
    layout: HomeLayout,
  },
  {
    path: config.routes.passwordChanging,
    component: PasswordChanging,
    allowedRoles: [config.roles.admin, config.roles.editor, config.roles.user],
    layout: HomeLayout,
  },
  {
    path: config.routes.profile,
    component: Profile,
    allowedRoles: [config.roles.admin, config.roles.editor, config.roles.user],
    layout: HomeLayout,
  },
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
    path: config.routes.test.compose.part1_Photos,
    component: Photos,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part2_QuestionResponse,
    component: QuestionResponse,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part3_Conversations,
    component: Conversations,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part4_ShortTalks,
    component: ShortTalks,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part5_IncompleteSentences,
    component: IncompleteSentences,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part6_TextCompletion,
    component: TextCompletion,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part7_SinglePassages,
    component: SinglePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part7_DoublePassages,
    component: DoublePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.test.compose.part7_TriplePassages,
    component: TriplePassages,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  // practice question
  {
    path: config.routes.test.practice.part1_Photos,
    component: Photos,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part2_QuestionResponse,
    component: QuestionResponse,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part3_Conversations,
    component: Conversations,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part4_ShortTalks,
    component: ShortTalks,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part5_IncompleteSentences,
    component: IncompleteSentences,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part6_TextCompletion,
    component: TextCompletion,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part7_SinglePassages,
    component: SinglePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part7_DoublePassages,
    component: DoublePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
  {
    path: config.routes.test.practice.part7_TriplePassages,
    component: TriplePassages,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },

  // vocabulary
  // editor
  {
    path: config.routes.vocabulary.compose,
    component: Vocabulary,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },

  // user
  {
    path: config.routes.vocabulary.practice,
    component: Vocabulary,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },

  // grammar
  {
    path: config.routes.grammar.compose,
    component: Grammar,
    allowedRoles: [config.roles.editor],
    layout: HomeLayout,
  },
  {
    path: config.routes.grammar.practice,
    component: Grammar,
    allowedRoles: [config.roles.user],
    layout: HomeLayout,
    props: { isUser: true },
  },
];

export { publicRoutes, privateRoutes };
