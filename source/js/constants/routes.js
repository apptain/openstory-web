export const publicPath = '/';

export const routeCodes = {
  HOME: publicPath, // stories
  LOGIN: `${ publicPath }login`,
  LOGIN_FACEBOOK: `${ publicPath }login/facebook`,
  LOGIN_TWITTER: `${ publicPath }login/twitter`,
  PROFILE: `${ publicPath }profile`,
  STORY_VIEW: `${ publicPath }story/:id`,
  STORY_FORM: `${ publicPath }story/create`,
  STORY_EDIT: `${ publicPath }story/edit/:id`,
  ACCOUNT_NEW: `${ publicPath }admin/account`,
  ACCOUNT_EDIT: `${ publicPath }admin/account/:id`,
};
