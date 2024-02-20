module.exports = (app) => {
  const devices = require('./device.controller.js');  //contact.controller.js를 로딩
  const datas = require('./data.controller.js');  //contact.controller.js를 로딩


  app.get('/devices', devices.findAll);             //모든 장치 검색
  app.get('/devices/:deviceId', devices.findOne);  //특정 장치 검색
  app.post('/devices',devices.create);             //새로운 장치 추가
  app.put('/devices/:deviceId', devices.update);   //특정 장치 업데이트
  app.delete('/devices/:deviceId', devices.delete); //특정 장치 삭제
  app.post('/datas', datas.create);  //장치 데이터 업로드
  app.get('/datas/:deviceId', datas.findOne ); //특정 장치의 데이터 검색

  app.get('/build', (req, res) => {
    //execute OS Command    
    const { exec } = require('child_process');
    const inferencefile_loaction = '../../ai-masking/inference.py';
    const im_path1 = './CaptureImg/thor.png  '; //source
    const im_path2 = '../../ai-masking/img/structure/wavy.png'; //target style
    const im_path3 = '../../ai-masking/img/structure/wavy.png'; //color
    const output_dir = './OutputDir/'; //output
    //python inference.py --im_path1 ./img/input/thor_face.png --im_path2 ./img/structure/wavy.png --im_path3 ./img/custom/custom.png --output_dir ./img/output/
    exec(`python ${inferencefile_loaction} --im_path1 ${im_path1} --im_path2 ${im_path2} --im_path3 ${im_path3} --output_dir ${output_dir}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    });
    res.json({ "message": "빌드 성공" });
  })
}
