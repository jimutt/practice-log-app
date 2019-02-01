<template>
  <v-container>
    <transition mode="out-in" name="fade">
      <new-practice-form
        v-if="state === constants.practiceStates.INACTIVE"
        @begin="startSession"
        :key="0"
      ></new-practice-form>
      <record-practice :session-title="sessionTitle" @done="toggleState" v-else></record-practice>
    </transition>
  </v-container>
</template>

<script>
import NewPracticeForm from '../components/NewPracticeForm.vue';
import RecordPractice from '../components/RecordPractice.vue';
import { practiceStates, constantsMixin } from '../settings/constants';

export default {
  mixins: [constantsMixin],
  components: {
    NewPracticeForm,
    RecordPractice
  },
  data() {
    return {
      state: practiceStates.INACTIVE,
      sessionTitle: ''
    };
  },
  computed: {},
  methods: {
    startSession(sessionTitle) {
      this.sessionTitle = sessionTitle;
      if (this.state === practiceStates.INACTIVE) this.toggleState();
    },
    toggleState() {
      if (this.state === practiceStates.INACTIVE)
        this.state = practiceStates.ACTIVE;
      else this.state = practiceStates.INACTIVE;
    }
  }
};
</script>
