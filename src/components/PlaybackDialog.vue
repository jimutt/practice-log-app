<template>
  <v-dialog v-model="showDialog" content-class="playback-dialog">
    <v-container align-center class="text-xs-center">
      <audio controls ref="audioEl" v-show="audioUrl != null">
        <source :src="audioUrl || ''" type="audio/mpeg">Your browser does not support audio playback.
      </audio>
    </v-container>
  </v-dialog>
</template>

<script>
import dialogMixin from '../mixins/dialogMixin';

export default {
  mixins: [dialogMixin],
  props: {
    recording: Object
  },
  data() {
    return {
      audioElId: 'audio-playback-el',
      audioUrl: null
    };
  },
  watch: {
    recording(newVal) {
      this.audioUrl = null;
      if (newVal == null) return null;
      let reader = new FileReader();
      reader.onload = e => {
        this.audioUrl = e.target.result;
        /* Warning: Hack below as $nextTick wasn't sufficient */
        setTimeout(() => {
          this.$refs.audioEl.load();
        }, 100);
      };
      reader.readAsDataURL(newVal.blob);
    },
    showDialog(val) {
      if (!val) {
        this.$refs.audioEl.pause();
        this.$refs.audioEl.currentTime = 0;
      } else {
        this.$refs.audioEl.play();
      }
    }
  }
};
</script>

<style lang="scss">
.playback-dialog {
  box-shadow: none !important;
}
</style>
