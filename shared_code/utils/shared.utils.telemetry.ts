const telemetryClient = require('prom-client');
const os = require('os');

// register your metric type with one of these functions (counter, gauge, histogram, summary),
// then use the returned variable to operate on it.
// see here for operations that can be performed on various metric tyoes: https://github.com/siimon/prom-client#custom-metrics
//
// e.g.
//
// const myGreatCounter = telemetry.registerCounter({name:"great_counter", help:"counts greatness"});
// ...
// ... greatness happens ...
// myGreatCounter.inc();

Telemetry.prototype.registerCounter = function(name, help) {
  if (!this.registeredMetrics[name]) {
    this.registeredMetrics[name] = new telemetryClient.Counter({ name, help });
  }
  return this.registeredMetrics[name];
};

Telemetry.prototype.registerGauge = function (name, help) {
  if (!this.registeredMetrics[name]) {
    this.registeredMetrics[name] = new telemetryClient.Gauge({ name, help });
  }
  return this.registeredMetrics[name];
};

Telemetry.prototype.registerHistogram = function (name, help) {
  if (!this.registeredMetrics[name]) {
    this.registeredMetrics[name] = new telemetryClient.Histogram({ name, help });
  }
  return this.registeredMetrics[name];
};

Telemetry.prototype.registerSummary = function(name, help) {
  if (!this.registeredMetrics[name]) {
    this.registeredMetrics[name] = new telemetryClient.Summary({ name, help });
  }
  return this.registeredMetrics[name];
};

Telemetry.prototype.getMetrics = async function (x, y) {
  return await this.telemetryRegister.metrics();
};

Telemetry.prototype.getTelemetryClient = function() {
  return telemetryClient;
};

function Telemetry() {
  this.telemetryRegister = telemetryClient.register;
  this.registeredMetrics = {};
  this.telemetryRegister.setDefaultLabels({
    app: 'realm-server',
    env: process.env.APP_ENV,
    host: os.hostname(),
  });
  telemetryClient.collectDefaultMetrics();
}

export default new Telemetry()