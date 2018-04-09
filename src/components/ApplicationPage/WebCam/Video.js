/* eslint-disable */ 
import './WebCam.css';
import PropTypes from 'prop-types';
import React from 'react';
import { trace,} from './helpers';


export class Video extends React.Component {
  constructor(props) {
    super(props);
    
    this.propTypes = { 
      audio: PropTypes.bool,
      width: PropTypes.number,
      height: PropTypes.number,
      onSuccess: PropTypes.func,
      onFailure: PropTypes.func,
      src: PropTypes.any,
    };
  
    this.defaultProps = {
      audio: true,
      video: true,
      width: 320,
      height: 160,
      onSuccess: (() => {}),
      onFailure: ((error) => {
        console.warn("An error occured while requesting user media");
        throw error;
      }),
    };
  
    this._mediaStream = null;
    this.state = {
      hasUserMedia: false,
      userMediaRequested: false
    };
  }

  componentDidMount() {

    if (!this._hasGetUserMedia()) {
      return false;
    }

    const { hasUserMedia, userMediaRequested } = this.state;
    if (!hasUserMedia && !userMediaRequested) {
      this._requestUserMedia();
    }
  }

  componentWillUnmount() {
    this._mediaStream && this._mediaStream.getTracks().forEach((track) => track.stop());
  }


  _hasGetUserMedia() {
    return !!(
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );
  }

  _requestUserMedia() {
    navigator.getUserMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    const constraints = {
      video: this.props.video,
      audio: this.props.audio,
    };

    navigator.getUserMedia(
      constraints,
      (stream) => {
        const video = this._video;

        video.srcObject = stream;

        this._mediaStream = stream;

        this.setState({
          hasUserMedia: true,
          userMediaRequested: true
        });

        this.props.onSuccess();
      },
      (error) => {
        this.props.onFailure(error);
      }
    );

  }

  render() {

    const { width, height } = this.props;

    return (
      <video
        width={width}
        height={height}
        ref={(component) => this._video = component}
        autoPlay
      />
    )
  }

};


export default Video;
