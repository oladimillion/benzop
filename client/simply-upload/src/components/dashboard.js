import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  AddFileRequest,
  RemoveFileRequest,
  UndoRemoveFileRequest,
  RetrieveFilesRequest,
} from "../actions/actions";
import Loading from "./loading";
import MsgInfo from "./msg-info";

class Dashboard extends Component {

  constructor(props){

    super(props);

    this.state = { 
      isLoading: false,
      info: null,
      files: [],
    }

    this.timerID = null;
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  componentDidMount(){
    this.setState({isLoading: true});
    this.props.RetrieveFilesRequest()
      .then(data => {
        this.setState({
          isLoading: false, 
          files: data.data.payload,
        });
        console.log(data.data.payload)
      })
      .catch(data => {
        this.setState({isLoading: false});
        // this.setOrClearInfo();
      })
  }

  showFiles(data){
    return data.map((data, index) => {
      return (
        <li className="card"
        key={data.fileid}>
          <div className="item">
            <a 
              className="item-link" 
              target="_blank"
              href={data.fileurl}>
              <img 
                width="100%"
                height="100%"
                src={data.fileurl} alt={data.fileid} />
            </a>
          </div>
          {/* <!-- end of item --> */}
          <div className="item-title">
            remove
          </div>
          {/* <!-- end of item title --> */}
          <div 
            style={{"display": "none"}}
            className="item-del">
            delete
          </div>
          {/* <!-- end of item del --> */}
        </li>
      )
    })
  }

  addFile(e){

    let files = e.target.files;

    if(!files && !files.length)
      return;

    let file = files[0];
    let name = file.name;

    if(
      !name.includes(".jpg", name.length - 4)
      && !name.includes(".png", name.length - 4)
      && !name.includes(".gif", name.length - 4)
    ){
      const data = {
        success: false, 
        message: "File formats supported are jpg, png and gif",
      };
      this.setState({info: data});
      this.setOrClearInfo();
      return;
    }

    this.setState({isLoading: true});

    const formData = new FormData;
    formData.append("avatar", file, name);

    this.props.AddFileRequest(formData)
      .then(data => {
        this.setState({
          isLoading: false, 
          info: data.data,
          files: [...this.state.files, data.data.payload],
        });
        this.setOrClearInfo();
      })
      .catch(data => {
        this.setState({isLoading: false, info: data.response.data});
        this.setOrClearInfo();
      })
  }

  setOrClearInfo(){
    if(this.timerID){
      clearTimeout(this.timerID);
      this.timerID = null;
    }

    this.timerID = setTimeout(()=> {
      this.setState({info: null});
      clearTimeout(this.timerID);
    }, 4000);
  }

  render() {

    const {
      isLoading,
      info,
      files,
    } = this.state;

    return (
      <div className="dashboard">
        {info && <MsgInfo info={info} />}
        {isLoading && <Loading />}
        <div className="add-wrapper">
          <label 
            htmlFor="file"
            className="button add-file">
            Add File
          </label>
          <input 
            onChange={this.addFile}
            style={{"display": "none"}}
            type="file" id="file" name="file"/>
        </div>
        {/* <!-- end of add wrapper --> */}


        <div className="cards-button">
          <div className="card-btn active">
            SAVED FILES
          </div>
          {/* <!-- end of card btn --> */}
          <div className="card-btn">
            TRASHED FILES
          </div>
          {/* <!-- end of card btn --> */}
        </div>
        {/* <!-- end of cards header --> */}

        <div className="cards-wrapper">
          <ul className="cards">
            {this.showFiles(files)}
          </ul>
        </div>
        {/* <!-- end of card wrapper --> */}

      </div>
    )
  }
}


export default connect(null, { 
  AddFileRequest,
  RemoveFileRequest,
  UndoRemoveFileRequest,
  RetrieveFilesRequest,
})(Dashboard);
