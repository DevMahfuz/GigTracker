import React from "react";
import ReportTable from "../report-table/ReportTable";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: {},
      isFetching: true,
      report: {},
      hasReport: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.value === 0) {
      alert("Select a Project First");
    }

    let fetchURL = `http://localhost:5000/${this.state.value}`;
    console.log(fetchURL);
    fetch(fetchURL)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ report: result, hasReport: true });
      })
      .catch((e) => {
        console.log(e);
        this.setState({ isFetching: false });
      });

    event.preventDefault();
  }

  render() {
    let isFetching = this.state.isFetching;
    let hasReport = this.state.hasReport;

    let pName;
    let pTime;
    let pBill;
    let pRate;
    if (hasReport) {
      pName = this.state.report.project.name;
      pRate = this.state.report.project.rate;
      let msTime = new Date(
        parseInt(this.state.report.project.work_time)
      ).getTime();
      let getTimeString = (timeInMs) => {
        var delim = ":";
        var hours = Math.floor((timeInMs / (1000 * 60 * 60)) % 60);
        var minutes = Math.floor((timeInMs / (1000 * 60)) % 60);
        var seconds = Math.floor((timeInMs / 1000) % 60);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return hours + delim + minutes + delim + seconds;
      };
      pTime = getTimeString(msTime);
      let sepTime = pTime.split(":");
      let totalHour = parseInt(sepTime[0]);
      let totalMunite = parseInt(sepTime[1]);
      let billOfH = pRate * totalHour;
      let billOfM = (pRate / 60) * totalMunite;
      pBill = Math.floor(billOfH + billOfM);
    }
    console.log(typeof pRate);
    return (
      <main className="container">
        <form onSubmit={this.handleSubmit} className="report-form">
          <label>
            Select Project:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="0">Select a Project</option>
              {!isFetching ? (
                this.state.data.projects.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option value="no">No project</option>
              )}
            </select>
          </label>

          <input type="submit" value="Get Report" />
        </form>

        <div className="display-report">
          {hasReport && (
            <ReportTable pName={pName} pTime={pTime} pBill={pBill} />
          )}
        </div>
      </main>
    );
  }
}

export default Report;
