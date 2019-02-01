import prettyms from 'pretty-ms';

export default {
  filters: {
    minuteSecondsClock(value) {
      if (value == null) return '00:00';
      let minutes = Math.floor(value / 60000);
      if (minutes <= 9) minutes = '0' + minutes;
      let seconds = Math.floor((value % 60000) / 1000);
      if (seconds <= 9) seconds = '0' + seconds;
      return `${minutes}:${seconds}`;
    },
    prettyMs(value, unitCount = 2) {
      if (value == 0) return '0s';
      return prettyms(value, {
        secDecimalDigits: 0,
        unitCount,
        compact: false
      }).replace('~', '');
    }
  }
};
