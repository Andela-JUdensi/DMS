import SignIn from './components/signin/SignInPage';
import SignUp from './components/signup/SignUpPage';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import AddDocument from './components/documents/AddDocument';
import Profile from './components/profile/Profile';
import ViewUsers from './components/users/ViewUsers';
import RequireAuthentication from './components/common/authentication/RequireAuthentication';
import PreventAuthenticatedUsers from './components/common/authentication/PreventAuthenticatedUsers';

const routes = [
  { path: '/',
    exact: true,
    component: Home,
  },
  { path: '/signin',
    exact: true,
    component: PreventAuthenticatedUsers(SignIn),
  },
  { path: '/signup',
    exact: true,
    component: PreventAuthenticatedUsers(SignUp),
  },
  { path: '/dashboard',
    exact: true,
    component: RequireAuthentication(Dashboard),
  },
  { path: '/new-document',
    exact: true,
    component: RequireAuthentication(AddDocument),
  },
  { path: '/profile',
    component: RequireAuthentication(Profile),
  },
  { path: '/members',
    exact: true,
    component: RequireAuthentication(ViewUsers),
  }
];

export default routes;
