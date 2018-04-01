import YOUTUBE_KEY from '../../../src/js/config/youtubekey';
import * as types from '../../../src/js/constants';
import * as actions from '../../../src/js/actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Actions', () => {
  let store;
  const video = {};
  beforeEach(() => {
    store = mockStore({});
    store.dispatch(actions.selectVideo(video));
  });
  afterEach(() => {
    fetchMock.restore();
  });

  it('should have correct length', () => {
    expect(store.getActions().length).toBe(1);
  });
  it('should dispatch correct type', () => {
    expect(store.getActions()[0].type).toBe(actions.selectVideo(video).type);
  });
  it('should dispatch correct payload', () => {
    expect(store.getActions()[0].payload).toEqual({});
  });
  describe('getVideos', () => {
    let store;
    let query = 'java';
    beforeEach(() => {
      store = mockStore({});
      fetchMock.mock('*', { items: [{}] });
    });
    it('dispaches Success correctly without initial', () => {
      return store.dispatch(actions.getVideos(query)).then(() => {
        expect(store.getActions().length).toBe(2);
        expect(store.getActions()[0].type).toBe(
          actions.fetchVideosAttempt().type
        );
        expect(store.getActions()[1].type).toBe(
          actions.fetchVideosSuccess().type
        );
      });
    });
    it('dispaches Success correctly with initial', () => {
      return store.dispatch(actions.getVideos(query, true)).then(() => {
        expect(store.getActions().length).toBe(3);
        expect(store.getActions()[0].type).toBe(
          actions.fetchVideosAttempt().type
        );
        expect(store.getActions()[1].type).toBe(
          actions.fetchVideosSuccess().type
        );
      });
    });
    it('dispaches failure correctly without initial', () => {
      fetchMock.mock('*', { throws: { message: 'API Failure' } });
      return store.dispatch(actions.getVideos(query, true)).then(() => {
        expect(store.getActions().length).toBe(3);
        expect(store.getActions()[0].type).toBe(
          actions.fetchVideosAttempt().type
        );
        expect(store.getActions()[1].type).toBe(actions.fetchVideosFail().type);
        expect(store.getActions()[1].payload).toEqual({
          message: 'API Failure'
        });
      });
    });
  });
});

// export function fetchVideosAttempt() {
//   return {
//     type: types.FETCH_VIDEOS_ATTEMPT
//   };
// }

// export function fetchVideosSuccess(videos) {
//   return {
//     type: types.FETCH_VIDEOS_SUCCESS,
//     payload: videos
//   };
// }

// export function fetchVideosFail(error) {
//   return {
//     type: types.FETCH_VIDEOS_FAIL,
//     payload: error
//   };
// }

// export function selectVideo(video) {
//   return {
//     type: types.SELECT_VIDEO,
//     payload: video
//   };
// }

// export function getVideos(query, initial) {
//   const fixed = 'https://www.googleapis.com/youtube/v3/search';
//   const url = `${fixed}?part=snippet&maxResults=5&q=${query}&key=${YOUTUBE_KEY}`;

//   const thunk = async function thunk(dispatch) {
//     try {
//       dispatch(fetchVideosAttempt());
//       const body = await fetch(url);
//       const res = await body.json();
//       dispatch(fetchVideosSuccess(res));
//       if (initial) {
//         dispatch(selectVideo(res.items[0]));
//       }
//     } catch (e) {
//       dispatch(fetchVideosFail(e));
//     }
//   };

//   thunk.meta = {
//     debounce: {
//       time: 1000,
//       key: 'FETCH_VIDEOS'
//     }
//   };
//   return thunk;
// }
