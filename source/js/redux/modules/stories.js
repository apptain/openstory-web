export const STORY_CHANGE = 'openstory/stories/STORY_CHANGE';
export const STORY_SELECT = 'openstory/stories/STORY_SELECT';
export const STORIES_GET = 'openstory/stories/STORIES_GET';
export const STORIES_GET_SUCCESS = 'openstory/stories/STORIES_GET_SUCCESS';
export const STORIES_GET_FAIL = 'openstory/stories/STORIES_GET_FAIL';
export const STORY_UPSERT = 'openstory/stories/STORY_UPSERT';
export const STORY_UPSERT_SUCCESS = 'openstory/stories/STORY_UPSERT_SUCCESS';
export const STORY_UPSERT_FAIL = 'openstory/stories/STORY_UPSERT_FAIL';
export const CATEGORIES_GET = 'openstory/stories/CATEGORIES_GET';
export const CATEGORIES_GET_SUCCESS = 'openstory/stories/CATEGORIES_GET_SUCCESS';
export const CATEGORIES_GET_FAIL = 'openstory/stories/CATEGORIES_GET_FAIL';

const initialState = {
  stories: null,
  storiesLoaded: false,
  storiesLoading: false,
  categories: null,
  categoriesLoading: false,
  story: {},
  storyEdit: {},
  storyUpserting: false,
  exception: null,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORY_CHANGE:
      return {...state, storyEdit: action.storyEdit};
    case STORIES_GET:
        return { ...state, storiesLoading : true};
    case STORIES_GET_SUCCESS:
      return { ...state, stories: action.data, storiesLoading: false, storiesLoaded: true};
    case STORIES_GET_FAIL:
      return { ...state, exception: action.exception, storiesLoading: false};
    case STORY_UPSERT:
      return { ...state, storyUpserting : true};
    case STORY_UPSERT_SUCCESS:
      return { ...state, story: action.story, storyUpserting: false, storyEdit: {}, stories: [...state.stories, action.story]};
    case STORY_UPSERT_FAIL:
      //TODO add toast notifications
      return { ...state, exception: action.exception, storyUpserting: false};
    case CATEGORIES_GET:
      return { ...state, categoriesLoading : true};
    case CATEGORIES_GET_SUCCESS:
      return { ...state, categories: action.categories, categoriesLoading: false};
    case CATEGORIES_GET_FAIL:
      //TODO add toast notifications
    case STORY_SELECT:
      return {...state, story: action.story};
    default:
      return state
  }
}

// export function storyChange(storyEdit) {
//   return {type: STORY_CHANGE, storyEdit};
// }

export function isLoaded(globalState) {
  return globalState.stories && globalState.stories.loaded;
}

export function storiesGet(apiCall) {
  return {type: STORIES_GET, apiCall};
}

// export function storyUpsert(apiCall, story, token) {
//   return {type: STORY_UPSERT, apiCall, story, token};
// }

export function storySelect(story){
  return {};
}
