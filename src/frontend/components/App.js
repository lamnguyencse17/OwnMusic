import React, { Component, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const PageNotFound = React.lazy(() => import("./common/PageNotFound"));
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Register from "./Register";
import { setUser } from "../actions/user";
import Music from "./Music";

const Dashboard = React.lazy(() => import("./Dashboard"));
const Purchase = React.lazy(() => import("./Purchase"));
const RegisterArtist = React.lazy(() => import("./RegisterArtist"));
const LoginArtist = React.lazy(() => import("./LoginArtist"));
const Artist = React.lazy(() => import("./Artist"));
const Browse = React.lazy(() => import("./Browse"));
const Logout = React.lazy(() => import("./Logout"));

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
    this.state = { isValidated: false };
  }
  async componentDidMount() {
    const type = await localStorage.getItem("type");
    if (!type) {
      return;
    }
    await this.props.setUser({ token: null, type });
    this.setState({ isValidated: true });
  }

  render() {
    const { userId, type } = this.props;
    return (
      <div style={{ backgroundColor: "#494949" }}>
        <Navbar />
        {/* {!this.state.isValidated ? (
          <></>
        ) : ( */}
        <Suspense fallback={<div className="loader"></div>}>
          <Switch>
            <Route path="/" exact render={() => <Landing {...this.props} />} />
            <Route
              path="/login/artist"
              render={() =>
                userId === "" ? (
                  <LoginArtist {...this.props} />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/login"
              render={() =>
                userId === "" ? <Login {...this.props} /> : <Redirect to="/" />
              }
            />
            <Route
              path="/logout"
              render={() =>
                userId !== "" ? <Logout {...this.props} /> : <Redirect to="/" />
              }
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
            />
            <Route
              path="/purchases"
              render={() =>
                userId === "" ? (
                  <Redirect to="/" />
                ) : (
                  <Purchase {...this.props} />
                )
              }
            />
            <Route path="/artist">
              <Route
                path="/artist/:artistId"
                render={() => <Artist {...this.props} />}
              />
            </Route>
            <Route
              path="/dashboard"
              render={() =>
                userId === "" && type !== "artist" ? (
                  <Redirect to="/" />
                ) : (
                  <Dashboard {...this.props} />
                )
              }
            />
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    userId: state.user._id,
    type: state.user.type,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
