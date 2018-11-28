export const publicPath = '/';

export const routeCodes = {
  HOME: publicPath, // stories
  LOGIN: `${ publicPath }login`,
  LOGIN_FACEBOOK: `${ publicPath }login/facebook`,
  LOGIN_TWITTER: `${ publicPath }login/twitter`,
  PROFILE: `${ publicPath }profile`,
  STORY_VIEW: `${ publicPath }story/:id`,
  STORY_FORM: `${ publicPath }story/create`,
  ACCOUNT_FORM: `${ publicPath }admin/account/:id?`,
  AUTHOR_LIST: `${ publicPath }admin/authors`,
  AUTHOR_APPLICATION: `${ publicPath }author/application/:id?`,
  AUTHOR_ADMIN: `${ publicPath }admin/author/:id/:subForm?/:subDocId?`,
  SCHEMA: `${ publicPath }/dockdomain`,
  DOC_GRID: `${ publicPath }/dockdomain/:schemaName`,
  DOC_FORM: `${ publicPath }/dockdomain/:schemaName/:id?/:subForm?/:subDocId?`,
};
