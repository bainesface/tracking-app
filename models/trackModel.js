const mongoose = require('mongoose');
const Track = mongoose.model('Track');

exports.fetchTracks = (id) => {
  return Track.find({ userId: id }).then((tracks) => {
    return tracks;
  });
};

exports.createTrack = (id, name, locations) => {
  console.log('in create track');
  const track = new Track({ userId: id, name: name, locations: locations });
  return track.save().then((data) => {
    return data;
  });
};
