<template>
  <v-form ref="form" v-model="valid">
    <v-layout wrap>
      <v-flex xs12>
        <h1 class="headline">What will you be practicing?</h1>

        <v-text-field
          v-model="activity"
          label="Activity"
          :rules="[v => (v && v.length > 1) || 'Please enter a title for your practice session']"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="recentSessionTitles.length > 0">
        <h2 class="subtitle">Choose from recent sessions:</h2>

        <v-card
          class="mb-1"
          v-for="(session, $index) in recentSessionTitles"
          :key="$index"
          @click="activity = session"
        >
          <v-card-title>{{session}}</v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs12 text-xs-center class="pt-2">
        <v-btn large color="primary" @click="startSession">Start session</v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      activity: ''
    };
  },
  computed: {
    ...mapState({
      sessions: 'sessions'
    }),
    recentSessionTitles() {
      return [
        ...new Set(
          this.sessions.sort((a, b) => b.endTime - a.endTime).map(s => s.title)
        )
      ].slice(0, 4, this.sessions.length);
    }
  },
  methods: {
    startSession() {
      if (!this.$refs.form.validate()) return;
      this.$emit('begin', this.activity);
    }
  }
};
</script>
