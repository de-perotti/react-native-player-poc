import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VideoPlayerRN from 'react-native-video-player';


class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.onEnd = this.onEnd.bind(this);
  }

  async onEnd() {
    if (__DEV__) console.log('Vídeo terminado', this.state, this.props);
  }

  render() {
    if (!this.props.selectedVideo) return null;

    const { thumbnail, path, config } = this.props.selectedVideo;

    return (
      <View>
        <Text>{config.title}</Text>
        <VideoPlayerRN
          endWithThumbnail
          thumbnail={{ uri: `file://${thumbnail.path}` }}
          video={{ uri: `file://${path}` }}
          duration={config.duration}
          onEnd={this.onEnd}
        />
      </View>
    );
  }
}

VideoPlayer.defaultProps = {
  selectedVideo: null,
};

VideoPlayer.propTypes = {
  selectedVideo: PropTypes.object,
};

const mapStateToProps = state => ({
  selectedVideo: state.videos[state.selected],
});

export default connect(mapStateToProps)(VideoPlayer);
