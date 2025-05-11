
export const PRIVATE_ROUTES = {
  Profile: '/profile',

};

export const PUBLIC_ROUTES = {
  Home: '/',
  About: '/about',
  Welcome: '/welcome',
  NotFound: '*',
  HomePage: '/home',
  
};

export const ROUTES = {
  ...PRIVATE_ROUTES,
  ...PUBLIC_ROUTES,
};
