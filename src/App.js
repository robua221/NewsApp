import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              pageSize={pageSize}
              country="us"
              category="general"
            />
          </Route>
          <Route
            exact
            path="/business"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="business"
              />
            )}
          ></Route>
          <Route
            exact
            path="/entertainment"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="entertainment"
              />
            )}
          ></Route>
          <Route
            exact
            path="/general"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="general"
              />
            )}
          ></Route>
          <Route
            exact
            path="/health"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="health"
              />
            )}
          ></Route>
          <Route
            exact
            path="/science"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="science"
              />
            )}
          ></Route>
          <Route
            exact
            path="/sports"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="sports"
              />
            )}
          ></Route>
          <Route
            exact
            path="/technology"
            component={() => (
              <News
                setProgress={setProgress}
                apiKey={apiKey}
                pageSize={pageSize}
                country="in"
                category="technology"
              />
            )}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
