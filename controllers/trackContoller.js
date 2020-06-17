const { fetchTracks, createTrack } = require('../models/trackModel');

exports.getTrack = (req, res, next) => {
  //console.log('in track controller');

  const { id } = req.user;
  return fetchTracks(id)
    .then((tracks) => {
      res.status(200).send(tracks);
    })
    .catch(next);
};

exports.postTrack = (req, res, next) => {
  console.log('in post track');
  const { id } = req.user;
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res.status(422).send({ msg: 'you must provide name and locations' });
  }

  return createTrack(id, name, locations)
    .then((track) => {
      res.status(201).send(track);
    })
    .catch(next);
};
