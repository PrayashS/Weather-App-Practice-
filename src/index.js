import React from "react";
import { render } from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./spinner";

class App extends React.Component {
  // constructor gets called when any c;ass is first created
  // constructor(props) {
  //   super(props);
  //   this.state = { lat: null, errorMessage: "" }; // initializing state object to set value
  // }

  /* ALTERNATE METHOD TO INITIALIZE STATE OBJECT*/
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }), // setState used to update state

      (err) => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return (
        <div>
          <SeasonDisplay lat={this.state.lat} />
        </div>
      );
    }
    return <Spinner message="Please accept location request" />;
  }
  render() {
    return <div className="border red">{this.renderContent()}</div>;

    // return (
    //   <div>
    //     Latitude: {this.state.lat} <br />
    //     Error: {this.state.errorMessage}
    //   </div>
    // );
  }
}

render(<App />, document.getElementById("root"));
