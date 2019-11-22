import React, { Component } from "react";

import withCheckLogin from "../../containers/with-check-login";

@withCheckLogin
class NotMatch extends Component {
  render() {
    return <div>404......</div>;
  }
}

export default NotMatch;
