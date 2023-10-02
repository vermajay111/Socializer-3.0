import "bootstrap/dist/css/bootstrap.css";
import chat from "../../assets/icons/chatbubble-ellipses-outline.svg";
import friends from "../../assets/icons/people-circle-outline.svg";
import post from "../../assets/icons/reader-outline.svg";
import AnalyticsIcons from "../../assets/icons/analytics-outline.svg";
import LaptopIcon from "../../assets/icons/laptop-outline.svg"
import settings from "../../assets/icons/settings-outline.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
    <h1 style={{ textAlign: "center", marginTop: 30 }}>Options</h1>
    <br/>
    <br/>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <Link to="/create_new_post">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150, marginBottom: 20 }}
            
          >
            <img src={post} width={50} height={50} style={{ marginRight: 20 }} />
            Make a new Post
          </button>
          </Link>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150, marginBottom: 20 }}
          >
            <img src={friends} width={50} height={50} style={{ marginRight: 20 }} />
            Friends
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150, marginBottom: 20 }}
          >
            <img src={chat} width={50} height={50} style={{ marginRight: 20 }} />
            Chats
          </button>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150, marginBottom: 20 }}
          >
            <img src={AnalyticsIcons} width={50} height={50} style={{ marginRight: 20 }} />
            My posts Analytics
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150, marginBottom: 20 }}
          >
            <img src={settings} width={50} height={50} style={{ marginRight: 20 }} />
            Settings
          </button>
        </div>
        <div className="col-md-6">
          <button
            type="button"
            className="btn btn-outline-secondary"
            style={{ width: "100%", height: 150 }}
          >
            <img src={LaptopIcon} width={50} height={50} style={{ marginRight: 20, }} />
            Versions
          </button>
        </div>
        
      </div>
    </div>
    </>
  );
}

export default Dashboard;
