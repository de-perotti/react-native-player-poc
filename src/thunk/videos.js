import RNFS from 'react-native-fs';
import { Alert } from 'react-native';
import constants from '../constants';
import { setVideos } from '../reducers/videos';
import { makeSureFilePathsExists } from '../helpers';

const reducer = (mapper, item) => {
  if (item.isFile()) {
    mapper[item.name] = item;
  }
  return mapper;
};

export default {
  all: () => async (dispatch) => {
    try {
      await makeSureFilePathsExists();

      const [videos, thumbnails, configs] = await Promise.all([
        RNFS.readDir(constants.path.videos),
        RNFS.readDir(constants.path.thumbsnails),
        RNFS.readDir(constants.path.configuration),
      ]);

      const mappedThumbnails = thumbnails.reduce(reducer, {});
      const mappedConfigs = configs.reduce(reducer, {});

      const mappedVideos = await Promise.all(videos
        .filter(video => video.isFile())
        .map((video) => {
          let res = video;
          const thumbnail = mappedThumbnails[video.name];

          if (thumbnail && thumbnail.isFile()) {
            res = ({
              ...res,
              thumbnail: mappedThumbnails[video.name],
            });
          }

          return new Promise((resolve) => {
            const config = mappedConfigs[video.name];
            if (config && config.isFile()) {
              RNFS.readFile(config.path, 'utf8')
                .then((content) => {
                  resolve({
                    ...res,
                    config: JSON.parse(content).video,
                  });
                })
                .catch((e) => { console.log(e); resolve(res); });
            }
          });
        }));

      dispatch(setVideos(mappedVideos));
    } catch (e) {
      Alert.alert(
        'Erro',
        'Não possível obter a lista de vídeos',
        [{ text: 'OK' }],
      );
    }
  },
};
