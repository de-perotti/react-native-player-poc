import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableOpacity, Text, StyleSheet, Image, FlatList } from 'react-native';
import { setSelected } from '../reducers/selected';


const styles = StyleSheet.create({
  root: {
    marginVertical: 2,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

class VideoList extends React.Component {
  render() {
    const { videos, setSelected } = this.props;
    return (
      <FlatList
        data={[...videos.keys]}
        keyExtractor={id => id}
        renderItem={({ item }) => (
          <TouchableOpacity key={item} style={styles.root} onPress={() => setSelected(item)}>
            <Image
              source={{ uri: `file://${videos[item].thumbnail.path}` }}
              style={{ height: 150, resizeMode: 'cover' }}
            />
            <Text>{`Id ${videos[item].name}`}</Text>
            <Text numberOfLines={1}>{`Título ${videos[item].config.title}`}</Text>
            <Text>{`Duração ${videos[item].config.duration}s`}</Text>
            <Text>{`Salvo ${(new Date(videos[item].mtime)).toLocaleDateString()}`}</Text>
            <Text>{`Tamanho ~${videos[item].size >> 20}MB`}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos,
});

const mapDispatchToProps = dispatch => ({
  setSelected: bindActionCreators(setSelected, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);
