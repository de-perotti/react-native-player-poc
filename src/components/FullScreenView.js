import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import thunkVideos from '../thunk/videos';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  box: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
});

class FullScreenView extends React.Component {
  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    return (
      <ScrollView
        style={[
          styles.root,
        ]}
      >
        <View style={styles.scrollView}>
          <View style={styles.box}>
            { this.props.children }
          </View>
        </View>
      </ScrollView>
    );
  }
}

FullScreenView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  fetchVideos: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchVideos: bindActionCreators(thunkVideos.all, dispatch),
});

export default connect(null, mapDispatchToProps)(FullScreenView);
