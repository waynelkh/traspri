/*
 * Voice-to-Text
 */
function AudioListener(callback) {
    try {
        this.listener = new webkitSpeechRecognition();
    } catch(ex) {
        throw "This browser does not have support for webspeech api";
    }


    this.listener.continuous = true;
    if(callback) {
        this.callBack = callback;
    }
    this.listener.lang = "en";
    this.listener.interimResults = true;
    var me = this;

    //-----Events---------
    this.listener.onresult = function(event) {
        if (event.results.length > 0) {
            var result = event.results[event.results.length-1];
            if(result.isFinal) {
                me.callBack(result[0].transcript);
            }
        }
    };
    this.listener.onsoundstart = function(event) {
        //TODO
        console.log('onsoundstart');
    };
    this.listener.onspeechstart = function(event) {
        //TODO
        console.log('onspeechstart');
    };
    this.listener.onsoundend = function(event) {
        //TODO
        console.log('onsoundend');
    };
    //-----End Events---------

    this.isContinuous = function() {
        return this.listener.continuous;
    };

    this.listen = function(lang, callback) {
        if(lang) {
            this.listener.lang = lang;
        }
        if(callback) {
            this.callBack = callback;
        }
        this.listener.start();
    };

    this.stop = function() {
        this.listener.stop();
        console.log("audio listener stopped");
    };
};