import SignIn from './components/signin/SignInPage';
import SignUp from './components/signup/SignUpPage';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import AddDocument from './components/documents/AddDocument';
import Profile from './components/profile/Profile';
import ViewUsers from './components/users/ViewUsers';
import requireAuthentication from './utils/requireAuthentication';
import preventAuthenticatedUsers from './utils/preventAuthenticatedUsers';

const routes = [
  { path: '/',
    exact: true,
    component: Home,
  },
  { path: '/signin',
    exact: true,
    component: preventAuthenticatedUsers(SignIn),
  },
  { path: '/signup',
    exact: true,
    component: preventAuthenticatedUsers(SignUp),
  },
  { path: '/dashboard',
    exact: true,
    component: requireAuthentication(Dashboard),
  },
  { path: '/new-document',
    exact: true,
    component: requireAuthentication(AddDocument),
  },
  { path: '/profile/:id',
    exact: true,
    component: requireAuthentication(Profile),
  },
  { path: '/members',
    exact: true,
    component: requireAuthentication(ViewUsers),
  }
];

export default routes;
