import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const PageNotFound = React.lazy(() => import("./common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { setUser, clearUser } from "../actions/user";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Register from "./Register";
import Artist from "./Artist";
import { setUser } from "../actions/user";
import Music from "./Music";
import Browse from "./Browse";
import LoginArtist from "./LoginArtist";
import RegisterArtist from "./RegisterArtist";

class App extends Component {
  constructor(props) {
    super(props);
    axios.defaults.withCredentials = true;
    const { clearUser, history } = this.props;
    window.addEventListener("storage", (e) => {
      if (e.newValue == "false") {
        clearUser();
        history.push("/");
      }
    });
  }
  async componentDidMount() {
    const type = await localStorage.getItem("type");
    if (!type) {
      return;
    }
    await this.props.setUser({ token: null, type });
  }

  render() {
    const { userId } = this.props;
    return (
      <>
        <Navbar />
        <Suspense fallback={<div className="loader"></div>}>
          <Switch>
            <Route path="/" render={() => <Landing {...this.props} />} exact />
            <Route
              path="/login/artist"
              render={() =>
                userId === "" ? (
                  <LoginArtist {...this.props} />
                ) : (
                  <Redirect to="/" />
                )
              }
              exact
            />
            <Route
              path="/login"
              render={() =>
                userId === "" ? <Login {...this.props} /> : <Redirect to="/" />
              }
              exact
            />
            <Route
              path="/register/artist"
              render={() =>
                userId === "" ? (
                  <RegisterArtist {...this.props} />
                ) : (
                  <Redirect to="/" />
                )
              }
              exact
            />
            <Route
              path="/register"
              render={() =>
                userId === "" ? (
                  <Register {...this.props} />
                ) : (
                  <Redirect to="/" />
                )
              }
              exact
            />
            <Route path="/artist">
              <Route
                path="/artist/:artistId"
                render={() => <Artist {...this.props} />}
              />
            </Route>
            <Route path="/music">
              <Route
                path="/music/:musicId"
                render={() => <Music {...this.props} />}
              />
            </Route>
            <Route path="/browse" render={() => <Browse {...this.props} />} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user._id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
