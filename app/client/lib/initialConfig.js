
// set providor
if(!web3.currentProvider)
    web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545")); //8545 8080 10.10.42.116


// disconnect any meteor server
if(location.host !== 'localhost:3000' && location.host !== '127.0.0.1:3000')
    Meteor.disconnect();


// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});

Meteor.Spinner.options = {
    lines: 17, // The number of lines to draw
    length: 0, // The length of each line
    width: 4, // The line thickness
    radius: 16, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1.7, // Rounds per second
    trail: 49, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 10, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
};


var connect = function(){

    if(web3.isConnected()) {
        connectToNode();

    } else {

        // make sure the modal is rendered after all routes are executed
        Meteor.setTimeout(function(){
            // if in mist, tell to start geth, otherwise start with RPC
            var gethRPC = (web3.admin) ? 'geth' : 'geth --rpc --rpccorsdomain "'+window.location.protocol + '//' + window.location.host+'"';

            EthElements.Modal.question({
                text: new Spacebars.SafeString(TAPi18n.__('wallet.app.texts.connectionError' + (web3.admin ? 'Mist' : 'Browser'), 
                    {node: gethRPC})),
                ok: function(){
                    Tracker.afterFlush(function(){
                        connect();
                    });
                }
            }, {
                closeable: false
            });

        }, 600);
    }
}
Meteor.startup(function(){
    connect();
});
