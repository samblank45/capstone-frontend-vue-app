import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import UsersIndex from '../views/UsersIndex.vue';
import UsersShow from '../views/UsersShow.vue';
import UsersEdit from '../views/UsersEdit.vue';
import EventsIndex from '../views/EventsIndex.vue';
import EventsNew from '../views/EventsNew.vue';
import EventsShow from '../views/EventsShow.vue';
import EventsEdit from '../views/EventsEdit.vue';
import ConversationsIndex from '../views/ConversationsIndex.vue';
import ConversationsShow from '../views/ConversationsShow.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/users',
    name: 'users-index',
    component: UsersIndex
  },
  {
    path: '/users/:id',
    name: 'users-show',
    component: UsersShow
  },
  {
    path: '/users/:id/edit',
    name: 'users-edit',
    component: UsersEdit
  },
  {
    path: '/events',
    name: 'events-index',
    component: EventsIndex
  },
  {
    path: '/events/new',
    name: 'events-new',
    component: EventsNew
  },
  {
    path: '/events/:id',
    name: 'events-show',
    component: EventsShow
  },
  {
    path: '/events/:id/edit',
    name: 'events-edit',
    component: EventsEdit
  },
  {
    path: '/conversations',
    name: 'conversations-index',
    component: ConversationsIndex
  },
  {
    path: '/conversations/:id',
    name: 'conversations-show',
    component: ConversationsShow
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
