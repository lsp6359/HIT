const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({   //스키마(Schema) 설정
  userId: {type: String, require: true},
  userPassword: { type: String, require: true}
});

module.exports = mongoose.model('User', UserSchema); //소문자화 후 복수형으로 바꾸어 devices 컬렉션이 됨