var UserButton = require('../models/button');
var configKnot = require('../config/knotinfo.js');

const cloud = new knotCloud(configKnot.cloud_url, configKnot.cloud_port,
                            configKnot.user_uuid, configKnot.user_token);

module.exports = function(button) {

  
  button.connect (
    async function main() {

     try {
       console.log("Entrei no main");
       await cloud.connect();
       console.log("conectei a Cloud");
       console.log (await cloud.getDevices());

       console.log(await cloud.getDevice('6784431f6e9656e9'));

       console.log(await cloud.subscribe('6784431f6e9656e9'));

       cloud.on((thing) => {
         console.log(thing['data']['value'])
         if(thing['data']['value'] == true){
           console.log('Botão clicado!!!')
         }
       });
       } catch (err) {
         console.log("Entrei no catch");
         console.error(err);
       }
    }
  );

}
