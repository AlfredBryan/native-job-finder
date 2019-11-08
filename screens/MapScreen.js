import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import MapView from "react-native-maps";
import { connect } from "react-redux";

import * as actions from "../actions";

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: 8.15,
      latitude: 9.833,
      longitudeDelta: 2.23,
      latitudeDelta: 3.839
    }
  };

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = region => {
    console.log(region);
    this.setState({ region });
  };

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region);
  };

  render() {
    const { region } = this.state;
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            title="Search This Area"
            icon={{ name: "search", color: "white" }}
            onPress={this.onButtonPress}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 0
  },
  buttonStyle: {
    backgroundColor: "#009688",
    width: 280,
    height: 50
  }
};

export default connect(
  null,
  actions
)(MapScreen);
