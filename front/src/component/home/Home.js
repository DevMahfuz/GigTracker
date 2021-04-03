import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import Timer from "../timer/Timer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { data: {}, isFetching: true };
    this.startCount = this.startCount.bind(this);
    this.stopCount = this.stopCount.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result, isFetching: false });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ isFetching: true });
      });
  }

  startCount(pid) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      id: pid,
      status: "start",
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let updateURL = `http://localhost:5000/updatestatus/${pid}`;
    fetch(updateURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Your Timer Has Started");
      })
      .catch((error) => console.log(error));

    //Request to update Last Start time
    let myHeaders3 = new Headers();
    myHeaders3.append("Content-Type", "application/json");
    let curentTime = new Date().getTime();

    let raw3 = JSON.stringify({
      id: pid,
      lastStartTime: curentTime,
    });

    let requestOptions3 = {
      method: "PUT",
      headers: myHeaders,
      body: raw3,
      redirect: "follow",
    };
    let updateLastStartTimeURL = `http://localhost:5000/update-start-time/${pid}`;
    fetch(updateLastStartTimeURL, requestOptions3)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    //Request to Update Start Time

    let myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");

    let raw2 = JSON.stringify({
      startTime: curentTime,
    });

    let requestOptions2 = {
      method: "POST",
      headers: myHeaders2,
      body: raw2,
      redirect: "follow",
    };
    let updateDate = `http://localhost:5000/countstart/${pid}`;
    fetch(updateDate, requestOptions2)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    window.location.reload();
  }

  stopCount(id) {
    //Request to Update Status
    this.setState({ isFetching: true });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
      id: id,
      status: "stop",
    });

    let requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let updateURL = `http://localhost:5000/updatestatus/${id}`;
    fetch(updateURL, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        alert("Your Timer Has Stoped");
      })
      .catch((error) => console.log(error));
    this.setState({ isFetching: false });

    //Request to update Last Endt time
    let myHeaders4 = new Headers();
    myHeaders4.append("Content-Type", "application/json");
    let curentTime = new Date().getTime();

    let raw4 = JSON.stringify({
      id: id,
      lastEndTime: curentTime,
    });

    let requestOptions4 = {
      method: "PUT",
      headers: myHeaders,
      body: raw4,
      redirect: "follow",
    };
    let updateLastEndTimeURL = `http://localhost:5000/update-end-time/${id}`;
    fetch(updateLastEndTimeURL, requestOptions4)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    //Request to Update End Time
    let myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");

    let raw2 = JSON.stringify({
      endTime: curentTime,
    });

    let requestOptions2 = {
      method: "POST",
      headers: myHeaders2,
      body: raw2,
      redirect: "follow",
    };
    let updateDate = `http://localhost:5000/countend/${id}`;
    fetch(updateDate, requestOptions2)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));

    //Request to Update New Work Time
    setTimeout(() => {
      let fetchURL = `http://localhost:5000/${id}`;
      fetch(fetchURL)
        .then((response) => response.json())
        .then((result) => {
          let pTime = new Date(
            parseInt(result.project.work_time || 1000)
          ).getTime();
          console.log(`pTime ${pTime})`);
          let lastStart = new Date(
            parseInt(result.project.last_start)
          ).getTime();
          console.log(`lastStart ${lastStart})`);
          let lastEnd = new Date(parseInt(result.project.last_end)).getTime();
          console.log(`lastEnd ${lastEnd})`);
          if (lastStart < lastEnd) {
            let recentWorkTime = lastEnd - lastStart;
            let totalTime = pTime + recentWorkTime;

            console.log(`totalTime ${totalTime})`);
            let myHeaders3 = new Headers();
            myHeaders3.append("Content-Type", "application/json");

            let raw3 = JSON.stringify({
              workTime: totalTime,
            });

            let requestOptions3 = {
              method: "PUT",
              headers: myHeaders3,
              body: raw3,
              redirect: "follow",
            };
            let updateTime = `http://localhost:5000/updatetime/${id}`;
            fetch(updateTime, requestOptions3)
              .then((response) => response.json())
              .then((result) => console.log(result))
              .catch((error) => console.log(error));
          }
        })
        .catch((e) => {
          console.log(e);
        });
      window.location.reload();
    }, 2000);
  }

  getTimeString(timeInMs) {
    var delim = ":";
    var hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 60);
    var minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
    var seconds = Math.floor((timeInMs / 1000) % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + delim + minutes + delim + seconds;
  }

  render() {
    console.log(this.state.data);
    let isFetching = this.state.isFetching;

    return (
      <main className=".container">
        <ul>
          {!isFetching ? (
            <div>
              {this.state.data.projects.map((item) => (
                <li key={item.id}>
                  <div className="project-name">
                    <Link to={`/${item.id}`}>
                      <FontAwesomeIcon icon={faFile} /> {item.name}{" "}
                    </Link>
                  </div>
                  <div className="project-button">
                    {item.status === "stop" ? (
                      <FontAwesomeIcon
                        onClick={() => this.startCount(item.id)}
                        icon={faPlay}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => this.stopCount(item.id)}
                        icon={faPause}
                      />
                    )}
                  </div>
                  <div className="project-time">
                    {!item.work_time ? (
                      "00:00"
                    ) : item.status === "stop" ? (
                      this.getTimeString(parseInt(item.work_time))
                    ) : (
                      <Timer
                        time={item.work_time}
                        lastStart={item.last_start}
                      />
                    )}
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <h2>Data Loading</h2>
          )}
        </ul>
      </main>
    );
  }
}

export default Home;
