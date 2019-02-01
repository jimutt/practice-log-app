import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  theme: {
    primary: '#00BFA5',
    secondary: '#A1887F',
    accent: '#FFB300',
    error: '#f44336',
    warning: '#FFD600',
    info: '#00B8D4',
    success: '#4caf50'
  },
  iconfont: 'md'
});
