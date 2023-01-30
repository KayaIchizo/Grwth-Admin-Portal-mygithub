// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_SETTING = '/setting';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_ROUTE = {
  root: ROOTS_DASHBOARD,
  dashboard: {
    root: ROOTS_DASHBOARD,
    batchList: path(ROOTS_DASHBOARD, '/batch'),
    adminQATask: path(ROOTS_DASHBOARD, '/task'),
  },
  publisher: {
    root: '/publisher',
  },
  qaTool: {
    root: '/qatool',
    qaTask: path('/qatool', '/qatask'),
  },
  renderTool: {
    root: '/rendertool',
  },
  setting: {
    root: ROOTS_SETTING,
  },
};

export const PATH_ROUTE_NAME = {
  home: 'QA Home',
  qaTool: 'QA Tool',
};
