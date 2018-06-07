import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

export default class ProgressBar extends React.PureComponent {
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
      <View style={{ marginBottom: 2 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{this.props.id}</Text>
          <Text>
            {Math.floor(this.state.progress * 100)}%
          </Text>
        </View>
        <Progress.Bar
          progress={this.state.progress}
          width={null}
        />
      </View>
    );
  }
}
