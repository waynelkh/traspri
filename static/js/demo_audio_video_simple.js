/*
put all in "/Users/guang/Documents/PROJECT/hacthon_nodejs/easyrtc/server_example/node_modules/easyrtc/demos"
and js in demo/js
*/
var selfEasyrtcid = "";


function connect() {
    // easyrtc.setVideoDims(400,300);
    easyrtc.setRoomOccupantListener(convertListToButtons);
    easyrtc.easyApp("easyrtc.audioVideoSimple", "selfVideo", ["callerVideo"], loginSuccess, loginFailure);
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
        onlineLink.onclick = function(easyrtcid) {
            return function() {
                performCall(easyrtcid);
            };
        }(easyrtcid);
        otherClientsA.appendChild(onlineLink);
    }

}


function performCall(otherEasyrtcid) {
    easyrtc.hangupAll();

    var successCB = function() {};
    var failureCB = function() {};
    easyrtc.call(otherEasyrtcid, successCB, failureCB);
    console.log("Perform call");
}


function loginSuccess(easyrtcid) {
    selfEasyrtcid = easyrtcid;
    document.getElementById("myRTCid").innerHTML = "My Id is " + easyrtc.cleanId(easyrtcid);
}


function loginFailure(errorCode, message) {
    easyrtc.showError(errorCode, message);
}
