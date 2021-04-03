import "./App.css";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";
import Home from "./component/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Project from "./component/project/Project";
import Create from "./component/create/Create";
import Report from "./component/report/Report";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/report" exact component={Report} />

          <Route path="/:id" component={Project} />
        </Switch>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
