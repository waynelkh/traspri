/*
put all in "/Users/guang/Documents/PROJECT/hacthon_nodejs/easyrtc/server_example/node_modules/easyrtc/demos"
and js in demo/js
*/
var selfEasyrtcid = "";
var targetId = '';
function connect() {
    // easyrtc.setVideoDims(400,300);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);

    easyrtc.setPeerListener(function(id, type,data) {
        if( type === "control" && data === "start")
        {
            traslationSpeech();
            targetId = id;
        }else{
            traslation('zh-CHT', 'en', data, function(td){
                document.getElementById('subtitle').innerHTML += td . '. ';
                say(td);
            });
        }
    });

    console.log("Connect to the easyRTC...");
 }


function clearConnectList() {

    var otherClientsA = document.getElementById('online-list');
    while (otherClientsA.hasChildNodes()) {
        otherClientsA.removeChild(otherClientsA.lastChild);
    }
}


function convertListToButtons (roomName, data, isPrimary) {
    clearConnectList();

    var otherClientsA = document.getElementById('online-list');
    for(var easyrtcid in data) {
        var onlineLink = document.createElement('a');
        onlineLink.className = "list-group-item";
        onlineLink.setAttribute('href', '#key=' + easyrtcid);
        onlineLink.text = easyrtcid;
        onlineLink.onclick = function(){
            performCall(easyrtcid);
            easyrtc.sendDataWS(targetId, "control",  "start");
        };
        otherClientsA.appendChild(onlineLink);
    }
}


function performCall(otherEasyrtcid) {
    easyrtc.hangupAll();
    targetId = otherEasyrtcid;
    traslationSpeech ()

    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherEasyrtcid, successCB, failureCB);
    console.log("Perform call");
}

function traslationSpeech (){
    console.log("-----轉換語音-----");
    var speech = new AudioListener();

    speech.listen("zh-TW", function(text) {
        subtitle(text);
    });

}

function subtitle (data) {
    easyrtc.sendDataWS(targetId, "message",  data);
}

function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("myRTCid").innerHTML = "My Id is " + easyrtc.cleanId(easyrtcid);
}

function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}

function say (mes) {
    var SpeechUtil = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    SpeechUtil.voice = voices[10]; // Note: some voices don't support altering params
    SpeechUtil.voiceURI = 'native';
    SpeechUtil.volume = 1; // 0 to 1
    SpeechUtil.rate = 0.8; // 0.1 to 10
    SpeechUtil.pitch = 2;  //0 to 2
    SpeechUtil.text = mes;
    SpeechUtil.lang = 'zh-TW';

    SpeechUtil.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };

    speechSynthesis.speak(SpeechUtil);
}

function traslation (ft, to, text, callback) {
    $.post( "/translation", { "ft": ft, "to": to, "text": text })
      .done(function( traslateText ) {
        callback(traslateText);
      });
}