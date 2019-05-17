import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import DropzoneComponent from "react-dropzone-component";

class Form extends Component {
  state = { file: [] };

  onChange = e => {
    let { file } = { ...this.state };
    file.push(e.target.files[0]);

    this.setState({ file });
  };

  handleSubmit = e => {
    e.preventDefault();
    const url = "http://localhost:8000/upload/";
    const formData = new FormData();
    const { file } = { ...this.state };
    file.forEach(img => {
      if (img.valid) formData.append("image", img.file);
    });
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios.post(url, formData, config);
  };

  render() {
    // const dropzoneStyle = {
    //   width: "20%",
    //   height: "150px",
    //   border: "1px solid black"
    // };
    const maxFiles = 9;

    const componentConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: "no-url"
    };
    const djsConfig = {
      acceptedFiles: ".jpg,.png,.gif",
      autoProcessQueue: false,
      maxFilesize: 1,
      addRemoveLinks: true,
      maxFiles: maxFiles
    };
    const eventHandlers = {
      addedfile: f => {
        let { file } = { ...this.state };
        if (file.length >= maxFiles) file.push({ valid: false, file: f });
        else file.push({ valid: true, file: f });
        this.setState({ file });
      },
      removedfile: f => {
        let { file } = { ...this.state };
        file.splice(file.indexOf(f), 1);
        this.setState({ file });
      }
    };

    return (
      <form onSubmit={this.handleSubmit}>
        {/* <Dropzone
          onDrop={acceptedFiles => {
            let { file } = { ...this.state };
            this.setState({ file: file.concat(acceptedFiles) });
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div style={dropzoneStyle} {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone> */}
        <div style={{ width: "80%", margin: "auto" }}>
          <DropzoneComponent
            id="dropzone"
            config={componentConfig}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
        </div>

        {/* <input type="file" name="image[]" multiple onChange={this.onChange} /> */}
        <br />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default Form;
