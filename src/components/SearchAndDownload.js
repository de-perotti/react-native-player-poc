import React from 'react';
import { connect } from 'react-redux';
import { Alert, View, TextInput, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import RNFS from 'react-native-fs';
import constants from '../constants';
import ProgressBar from './ProgressBar';
import thunkVideos from '../thunk/videos';
import {get360pVideo, get640Thumbnail, getVideo} from '../helpers';


class SearchAndDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      keys: new Set(),
    };

    this.progressBars = {};

    this.handleOnChange = this.handleOnChange.bind(this);
    this.downloadVideo = this.downloadVideo.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }

  handleProgress(id) {
    let ticks = 0;
    return (res) => {
      ticks += 1;
      if ((ticks % 50) === 0) {
        this.progressBars[id].handleProgress(res.bytesWritten / res.contentLength);
      }
    };
  }

  downloadVideo() {
    const { id } = this.state;
    this.setState({ id: '' }, async () => {
      try {
        if (!this.props.keys.has(id) && !this.state.keys.has(id)) {
          this.setState({
            keys: this.state.keys.add(id),
          }, async () => {
            // { bytesWritten, jobId, statusCode }

            const config = await await getVideo(id);

            const [video, thumbnail, configFile] = await Promise.all([
              RNFS.downloadFile({
                fromUrl: get360pVideo(config),
                toFile: `${constants.path.videos}/${id}`,
                progress: this.handleProgress(id),
              }).promise,
              RNFS.downloadFile({
                fromUrl: get640Thumbnail(config),
                toFile: `${constants.path.thumbsnails}/${id}`,
              }).promise,
              RNFS.writeFile(
                `${constants.path.configuration}/${id}`,
                JSON.stringify(config),
                'utf8',
              ),
            ]);

            console.log('configFile', configFile);

            if (video.statusCode === 200) {
              // Refreshes list again on the page
              this.props.fetchVideos();
            }

            if (thumbnail.statusCode !== 200) {
              Alert.alert(
                'Atenção',
                'Não foi possível obter o thumbnail do vídeo, mas o mesmo foi baixado com sucesso',
                [{ text: 'Entendi' }],
              );
            }

            const newKeys = new Set([...this.state.keys]);
            newKeys.delete(id);
            this.setState({ keys: newKeys });
          });
        } else {
          throw new Error('Evite fazer downloads duplicados');
        }
      } catch (e) {
        Alert.alert(
          'Erro',
          e.message,
          [{ text: 'OK' }],
        );
      }
    });
  }

  handleOnChange(text) {
    this.setState({ id: text });
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 5 }}>
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
        {
          [...this.state.keys].map(id => (
            <ProgressBar
              key={id}
              id={id}
              ref={(ref) => {
                this.progressBars[id] = ref;
              }}
            />
          ))
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  keys: state.videos.keys,
});

const mapDispatchToProps = dispatch => ({
  fetchVideos: bindActionCreators(thunkVideos.all, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndDownload);
