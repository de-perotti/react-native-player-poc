import RNFS from 'react-native-fs';

export default {
  path: {
    videos: `${RNFS.DocumentDirectoryPath}/videos`,
    thumbsnails: `${RNFS.DocumentDirectoryPath}/thumbnails`,
    configuration: `${RNFS.DocumentDirectoryPath}/configuration`,
  },
};
