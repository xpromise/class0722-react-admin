import React, { Component } from "react";

import withCheckLogin from "../../containers/with-check-login";

@withCheckLogin
class Home extends Component {
  render() {
    return <div>Home...</div>;
  }
}

export default Home;
