import React from 'react';
import { VideoList } from '../../../src/js/components/VideoList';

//Below are related to enzyme
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });

describe('VideoList Component', () => {
  let videoList, selectVideo;

  beforeEach(() => {
    videoList = [{ id: { videoId: '1' } }, { id: { videoId: '2' } }];
    selectVideo = jest.fn();
  });

  it('renders', () => {
    let wrapper = shallow(
      <VideoList
        selectVideo={selectVideo}
        videoList={videoList}
        isLoading={false}
        error={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Loading message', () => {
    let wrapper = shallow(
      <VideoList
        selectVideo={selectVideo}
        videoList={videoList}
        isLoading={true}
        error={null}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Error message', () => {
    let wrapper = shallow(
      <VideoList
        selectVideo={selectVideo}
        videoList={videoList}
        isLoading={false}
        error={{ message: 'Error While loading Videos' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('passes on the selectVideo fn', () => {
    expect(selectVideo.mock.calls.length).toBe(0);
  });
});
