const Device = require('./device.model.js');

// 새로운 연락처 만들기
exports.create = (req, res) => {
  const contact = new Device({ 
    deviceId: req.body.deviceId,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    description: req.body.description
  });
  
  //데이터베이스에 새로운 연락처 저장하기 
  contact.save()
  .then(data => { res.send(data); })
  .catch(err => { 
    res.status(500).send({ message: err.message}); 
  });
};


//모든 연락처 검색
exports.findAll = (req, res) => {
  Device.find()
  .then( contacts => { 
	res.send(contacts);
	console.log(contacts)	//test log
	  })
  .catch(err => { 
    res.status(500).send({ message: err.message }); 
  });
};

//특정한 연락처 검색
exports.findOne = (req, res) => {
  Device.find({deviceId : req.params.deviceId})
  .then( contact => {
    if(!contact){
      return res.status(404).send({
        message: req.params.deviceId + "에 해당하는 장치가 없습니다." }); 
    }
    res.send(contact);
  }).catch(err => { 
    return res.status(500).send({ message: req.params.deviceId +" 로 검색 중 에러 발생" });
  });  
};

//업데이트
exports.update = (req, res) => {
    Device.findOneAndUpdate( {deviceId:req.params.deviceId}, 
        { deviceId: req.body.deviceId, name:req.body.name, latitude:req.body.latitude, longitude:req.body.longitude, description:req.body.description }, 
        {new:true}
    )
    .then(contact => { 
        if(!contact) {
        return res.status(404).send({ message: req.params.deviceId +
            "에 해당하는 장치가 발견되지 않았습니다." })
        }
        res.send(contact);
    }).catch(err => { 
        return res.status(500).send({ message: err.message });
    });
};

//삭제
exports.delete = (req, res) => {
  Device.findOneAndDelete({deviceId:req.params.deviceId})
  .then(contact => {
    if(!contact) {
      return res.status(404).send({ message: req.params.deviceId +"에 해당하는 장치가 없습니다." })
    }
    res.send({ message: "정상적으로 " + req.params.deviceId + " 장치가 삭제되었습니다." })
  })
  .catch(err => {
    return res.status(500).send({ message: err.message }); 
  });
};








