import {languages} from '@/lib/i18n/settings'

// Generate and add i18n prefixed routes
const I18nRoutes = (baseRoutes:string[], languages:string[]) => {
    const allRoutes: string[] = [];
    // First, add the original routes to the array
    allRoutes.push(...baseRoutes);

    languages.forEach(lang => {
      baseRoutes.forEach(route => {
        allRoutes.push(`/${lang}${route}`);
      });
    });
    return allRoutes;
  };


/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "",   //homepage reduce /en  will change to ""
    "/"  ,
    "/auth/new-verification",
    "/story",
    "/terms",
    "/minds",
    "/tools",
];
   
/**
 * An array of routes that are used for authentication
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login", 
    "/auth/register",
    "/auth/error"
];


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix  = "/api/auth" ;


/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";