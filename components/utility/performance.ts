const Performance = {
  dispatch: undefined,
  state: undefined,
  init: (dispatchMethod) => {
    Performance.dispatch = dispatchMethod;
  },
  start: (channel: string) => {
    Performance[channel] = {};
    Performance[channel].t0 = performance.now();
  },
  end: (channel: string) => {
    if (Performance[channel]) {
      // console.log('end', channel);
      Performance[channel].t1 = performance.now();
      const { t0, t1 } = Performance[channel];
      if (t0) {
        const performnaceTime = t1 - t0;
        Performance[channel].t0 = undefined;
        const performanceUpdates = {};
        performanceUpdates[channel] = performnaceTime.toFixed(1);
        Performance.dispatch({
          type: 'UPDATE_PERFORMANCE',
          performance: performanceUpdates,
        });
      }
    }
  },
};

export default Performance;
