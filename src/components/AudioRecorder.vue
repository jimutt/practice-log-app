<template>
  <v-flex xs-12 class="text-xs-center">
    <v-alert :value="deviceSelectionError != null" type="error">{{strings.noMicrophone}}</v-alert>
    <div class="mt-4 mb-4">
      <!-- Record/Pause -->
      <v-btn fab dark v-if="recorderState !== 'recording'" @click="record" color="white">
        <v-icon color="red">mic</v-icon>
      </v-btn>
      <v-btn fab dark v-else @click="pauseRecording" color="white">
        <v-icon color="red">pause</v-icon>
      </v-btn>
      <!-- -->
      <v-btn fab v-show="recorderState !== 'stopped'" @click="stopRecording" color="white">
        <v-icon>stop</v-icon>
      </v-btn>
    </div>
    <recording-list :recordings="value" @delete="deleteRecording"></recording-list>
    <audio-device-select-dialog
      v-model="showSelectableDevices"
      :devices="availableDevices"
      @record="startRecording"
    ></audio-device-select-dialog>
  </v-flex>
</template>

<script>
import AudioDeviceSelectDialog from './AudioDeviceSelectDialog.vue';
import Recorder from '../recorder';
import RecordingList from './RecordingList.vue';

export default {
  components: {
    AudioDeviceSelectDialog,
    RecordingList
  },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      /** @type {Recorder} */
      recorder: null,
      recorderState: 'stopped',
      enableRecording: true,
      deviceSelectionError: null,
      showSelectableDevices: false,
      availableDevices: [],
      strings: {
        noMicrophone: 'No suitable recording device could be found.'
      },
      audioUrl: ''
    };
  },
  created() {
    this.recorder = new Recorder();
    this.recorder.addEventListener('start', () => {
      this.recorderState = 'recording';
    });
    this.recorder.addEventListener('stop', () => {
      this.recorderState = 'stopped';
    });
    this.recorder.addEventListener('pause', () => {
      this.recorderState = 'paused';
    });
    this.recorder.addEventListener(
      'resume',
      () => (this.recorderState = 'recording')
    );
  },
  methods: {
    async record() {
      if (this.recorderState === 'paused') {
        this.recorder.resume();
        return;
      }
      this.enableRecording = false;
      this.deviceSelectionError = null;
      let previousDeviceId = this.$store.state.selectedAudioInputId;
      this.availableDevices = await this.getAvailableDevices();

      if (this.availableDevices.length < 1) {
        this.deviceSelectionError = true;
        return;
      }

      if (this.availableDevices.length === 1)
        return this.startRecording(this.availableDevices[0]);

      let previousDevice = this.availableDevices.find(
        d => d.deviceId === previousDeviceId
      );
      if (previousDevice) return this.startRecording(previousDevice.deviceId);

      this.presentSelectableDevices();
    },
    startRecording(deviceId) {
      this.$store.commit('setAudioInputId', deviceId);
      this.recorder.start(deviceId);
    },
    pauseRecording() {
      this.recorder.pause();
    },
    deleteRecording(recording) {
      this.$emit('input', this.value.filter(x => !Object.is(x, recording)));
    },
    async stopRecording() {
      await this.recorder.stop();
      let recording = {};
      Object.assign(recording, this.recorder.lastRecording);
      this.value.push(recording);
      this.$emit('input', this.value);
    },
    async getAvailableDevices() {
      try {
        // First request default device, to grant permissions to let us access labels for input devices
        await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        });
        let devices = await navigator.mediaDevices.enumerateDevices();
        return devices.filter(d => d.kind === 'audioinput');
      } catch (e) {
        console.error('Error enumerating media devices: ', e);
        return [];
      }
    },
    presentSelectableDevices() {
      this.showSelectableDevices = true;
    }
  }
};
</script>

