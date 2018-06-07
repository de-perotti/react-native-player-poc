import React from 'react';
import { View } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import axios from 'axios';


class VideoPlayerComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    return props.id !== state.id ? { id: props.id } : null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      thumbnail: null,
      url: null,
      width: null,
      height: null,
      duration: null,
    };
    this.onEnd = this.onEnd.bind(this);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      try {
        const res = await axios.get(`https://player.vimeo.com/video/${this.props.id}/config`);
        const _res = res.json();

        this.setState({
          ...(_res.video),
          url: get360pVideo(_res),
          thumbnail: _res.video.thumbs['640'],
        });
      } catch (e) {
        //
      }
    }
  }

  async onEnd() {
    if (__DEV__) console.log('Vídeo terminado', this.state, this.props);
  }

  render() {
    return (
      <View>
        <VideoPlayer
          endWithThumbnail
          thumbnail={{ uri: this.state.thumbnail }}
          video={{ uri: this.state.url }}
          videoWidth={this.state.width}
          videoHeight={this.state.height}
          duration={this.state.duration}
          onEnd={this.onEnd}
        />
      </View>
    );
  }
}

export default VideoPlayerComponent;
