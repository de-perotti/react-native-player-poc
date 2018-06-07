const VIDEOS_SET = 'VIDEOS_SET';

export const setVideos = videos => ({ type: VIDEOS_SET, videos });

const initialState = {
  keys: new Set(),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case VIDEOS_SET:
      return {
        ...action.videos.reduce((mapper, video) => {
          mapper[video.name] = video; return mapper;
        }, {}),
        keys: new Set(action.videos.map(video => video.name)),
      };

    default:
      return state;
  }
}
