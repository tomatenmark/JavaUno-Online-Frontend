const noSuchGameMessage = 'failure: de.markherrmann.javauno.exceptions.IllegalArgumentException: There is no such game.';
const noSuchPlayerMessage = 'failure: de.markherrmann.javauno.exceptions.IllegalArgumentException: There is no such player in this game.';

function handleRequestSuccess(response) {
    app.callback(response.data);
}

function handleRequestError(response) {
    if(response.data.message !== undefined){
        console.error("Request-Error: " + response.data.message);
        if(response.data.message === noSuchGameMessage){
            reset();
        }
        if(response.data.message === noSuchPlayerMessage){
            app.$cookies.remove('playerUuid');
            location.reload();
        }
    } else {
        console.error("Request-Error: " + response);
    }
}

function doGetRequest(path, callback){
    app.callback = callback;
    app.$http.get(config.apiBase+path).then(handleRequestSuccess, handleRequestError);
}

function doPostRequest(path, data, callback){
    app.callback = callback;
    app.$http.post(config.apiBase+path, JSON.stringify(data)).then(handleRequestSuccess, handleRequestError);
}

function doDeleteRequest(path, callback){
    app.callback = callback;
    app.$http.delete(config.apiBase+path).then(handleRequestSuccess, handleRequestError);
}
