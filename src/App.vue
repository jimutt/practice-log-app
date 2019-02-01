<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class>
        <span>Practice Log</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <v-layout align-center justify-center wrap class="app-layout">
        <v-flex xs12 lg6>
          <transition name="fade" mode="out-in" duration="150">
            <router-view/>
          </transition>
        </v-flex>
      </v-layout>
    </v-content>

    <bottom-navigation></bottom-navigation>
  </v-app>
</template>

<script>
import BottomNavigation from './components/BottomNavigation';
import { initDb } from './db/db.js';

export default {
  name: 'App',
  components: {
    BottomNavigation
  },
  data() {
    return {
      //
    };
  },
  created() {
    initDb();
    this.$store.dispatch('loadSessions');
    this.$store.dispatch('loadGoal');
  }
};
</script>

<style lang="scss">
/* Used with vh-check to fix vh beavior with navigation bar on iOS Safari and Android Chrome */
.application--wrap {
  min-height: calc(100vh - var(--vh-offset, 0px));
  height: calc(100vh - var(--vh-offset, 0px));
}

.v-content {
  max-height: calc(100vh - var(--vh-offset, 0px) - 56px);
  overflow: auto;
}

.app-layout {
  overflow: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* Workaround for this annoying Vuetify bug: https://github.com/vuetifyjs/vuetify/issues/2178 */
@media (hover: none) {
  .v-btn:hover:before {
    background-color: transparent !important;
  }
}
</style>
