var WebTorrent = require('webtorrent-hybrid');
var client = new WebTorrent({dht:false});
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://192.168.33.100:27017/test", function(err, db) {
    if(err) {
        console.log(err);
    }
    var collection = db.collection('backups');

    
    function checkNew() {
        collection.find({}).toArray(function(err, docs) {
            download(docs);
        });

        setTimeout( checkNew, 10000 );

    }
       
    function download(docs) {
        docs.forEach(function (item) {
            if (!client.get(item.infoHash)) {
                client.add(item.infoHash, { path: 'download' }, function (torrent) {
                    progress(torrent);
                });
            }
        });
    }
    
    function progress(torrent) {
        torrent.on('done', function () {
            console.log('torrent download finished')
            //TODO: exit form app. Will be run by cron
        });

        torrent.on('download', function() {
            setTimeout( function () {
                console.log('progress: ' + (torrent.progress * 100))
            }, 4000 );

        });
    }


    checkNew();

});


