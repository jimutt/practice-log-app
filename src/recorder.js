/**
 * Crude class for recording HTML5 audio
 * Emits the following events: start, stop, pause, resume
 */
export default class Recorder extends EventTarget {
  /** @type {MediaRecorder} */
  _mediaRecorder = null;
  /** @type {string} */
  _inputDeviceId = null;
  /** @type {number} */
  _maxDuration = null;
  _audioChunks = [];

  _recResumeTimestamp = null;
  recDuration = 0;

  /**
   * @type {object} Last recording
   */
  lastRecording = null;

  constructor(options = {}) {
    super();
    this._inputDeviceId = options.inputDeviceId || null;
    this.maxDuration = options.maxDuration || null;
  }

  /**
   *
   * @param {MediaDeviceInfo} inputDevice
   */
  async start(inputDeviceId) {
    if (!inputDeviceId && !this._inputDeviceId) {
      throw new Error('No input device specified');
    }
    if (inputDeviceId) this._inputDeviceId = inputDeviceId;

    if (this._mediaRecorder && this._mediaRecorder.state === 'recording')
      return;

    let stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: this._inputDeviceId
      }
    });
    this._setupMediaRecorder(stream);
    this._audioChunks = [];
    this._mediaRecorder.start();
    this._recResumeTimestamp = new Date();
    this.dispatchEvent(new CustomEvent('start'));
  }

  pause() {
    if (this._mediaRecorder && this._mediaRecorder.state === 'inactive') return;
    this.recDuration += new Date() - this._recResumeTimestamp;
    this._recResumeTimestamp = null;
    this._mediaRecorder.pause();
    this.dispatchEvent(new CustomEvent('pause'));
  }

  async resume() {
    if (this._mediaRecorder && this._mediaRecorder.state === 'recording')
      return;

    await this._mediaRecorder.resume();
    this._recResumeTimestamp = new Date();
    this.dispatchEvent(new CustomEvent('resume'));
  }

  async stop() {
    return new Promise((resolve, reject) => {
      if (this._mediaRecorder && this._mediaRecorder.state === 'inactive')
        resolve();
      this._mediaRecorder.onstop = e => {
        this._onRecorderStop(e);
        resolve(this.audioUrl);
        this.dispatchEvent(new CustomEvent('stop'));
      };
      this._mediaRecorder.stop();
    });
  }

  _onRecorderStop(e) {
    if (this._recResumeTimestamp !== null) {
      this.recDuration += new Date() - this._recResumeTimestamp;
    }
    let blob = new Blob(this._audioChunks, { type: 'audio/mpeg' });
    this.lastRecording = {
      blob,
      duration: this.recDuration,
      endTime: new Date()
    };
    this.recDuration = 0;
    this._recResumeTimestamp = null;
  }

  _setupMediaRecorder(stream) {
    this._mediaRecorder = new MediaRecorder(stream);
    this._mediaRecorder.ondataavailable = e => {
      this._audioChunks.push(e.data);
    };
  }
}
