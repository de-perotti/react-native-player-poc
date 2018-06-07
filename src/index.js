import React from 'react';
import { Provider } from 'react-redux';
import store from './Store';

import FullScreenView from './components/FullScreenView';
import SearchAndDownload from './components/SearchAndDownload';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <FullScreenView>
          <VideoPlayer />
          <SearchAndDownload />
          <VideoList />
        </FullScreenView>
      </Provider>
    );
  }
}
