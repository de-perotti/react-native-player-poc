import { AsyncStorage } from 'react-native';
import axios from 'axios';
import RNFS from 'react-native-fs';
import constants from './constants';


export const makeSureFilePathsExists = async () => {
  if (!(await RNFS.exists(constants.path.videos))) {
    await RNFS.mkdir(constants.path.videos);
  }
  if (!(await RNFS.exists(constants.path.thumbsnails))) {
    await RNFS.mkdir(constants.path.thumbsnails);
  }
  if (!(await RNFS.exists(constants.path.configuration))) {
    await RNFS.mkdir(constants.path.configuration);
  }
};

export const get360pVideo = res =>
  res.request.files.progressive.filter(k => k.height === 360)[0].url;

export const get640Thumbnail = res =>
  res.video.thumbs['640'];

export const getVideo = async (id) => {
  const { data } = await axios.get(`https://player.vimeo.com/video/${id}/config`);
  await AsyncStorage.setItem(id, JSON.stringify(data));
  return data;
};
