const mongoose = require('mongoose');

var DeviceSchema = mongoose.Schema({   //스키마(Schema) 설정
  deviceId: {type: Number, require:true},
  name: { type: String, require: true},
  latitude: { type: Number, require: true},
  longitude: { type: Number, require: true},
  description: { type: String, require: true},
  register_date: { type: Date, default:Date.now}
});

module.exports = mongoose.model('Device', DeviceSchema); //소문자화 후 복수형으로 바꾸어 devices 컬렉션이 됨
