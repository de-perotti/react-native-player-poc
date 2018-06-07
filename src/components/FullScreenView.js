import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  scrollView: {
    flex: 1,
  },
});

class FullScreenView extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.root,
        ]}
      >
        <ScrollView style={styles.scrollView}>
          { this.props.children }
        </ScrollView>
      </View>
    );
  }
}

FullScreenView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default FullScreenView;
