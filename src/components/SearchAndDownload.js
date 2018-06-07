import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { BarIndicator } from 'react-native-indicators';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { Alert, View, TextInput, Button, StyleSheet, Animated } from 'react-native';
import RNFS from 'react-native-fs';
import axios from 'axios';

const styles = StyleSheet.create({
  root: {

  },
  input: {

  },
  button: {

  },
});

const VIDEO_LIST_DIR = `${RNFS.DocumentDirectoryPath}/videos`;


const get360pVideo = (res) => {
  return res.request.files.progressive.filter(k => k.height === 360)[0].url;
};


class ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
    this.handleProgress = this.handleProgress.bind(this);
  }

  handleProgress(progress) {
    this.setState({ progress });
  }

  render() {
    return (
      <Progress.Bar
        progress={this.state.progress}
        width={null}
      />
    );
  }
}


class SearchAndDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.getVideo = this.getVideo.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  async getVideo(id) {
    const { data } = await axios.get(`https://player.vimeo.com/video/${id}/config`);
    return data;
  }

  handleProgress(res) {
    this.progressBar.handleProgress(res.bytesWritten / res.contentLength);
  }

  async downloadVideo() {
    try {
      const hasDir = await RNFS.exists(VIDEO_LIST_DIR);
      if (!hasDir) {
        await RNFS.mkdir(VIDEO_LIST_DIR);
      }

      const { id } = this.state;

      await RNFS.downloadFile({
        fromUrl: get360pVideo(await this.getVideo(id)),
        toFile: `${VIDEO_LIST_DIR}/${id}`,
        progress: this.handleProgress,
      }).promise;

    } catch (e) {
      console.log(e);
      Alert.alert(
        'Erro',
        e.message,
        [{ text: 'OK' }],
      );
    }
  }

  handleOnChange(text) {
    this.setState({ id: text });
  }

  render() {
    return (
      <View style={styles.root}>
        <ProgressBar ref={(ref) => { this.progressBar = ref; }} />
        <TextInput
          placeholder="Insira ID do vídeo no VIMEO"
          onChangeText={this.handleOnChange}
          value={this.state.id}
        />
        <Button
          title="Baixar"
          onPress={this.downloadVideo}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({

});

export default connect(null, mapDispatchToProps)(SearchAndDownload);
