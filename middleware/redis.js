modeule.exports = function timeSeriesCache(_, res, next) {
  client.get(timeSeries, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(setResponse(username, data));
    } else {
      next();
    }
  });
};
