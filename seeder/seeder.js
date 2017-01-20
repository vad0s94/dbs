var WebTorrent = require('webtorrent-hybrid');
var client = new WebTorrent({dht:false});
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var dir = 'backup/';
var tracker = 'http://192.168.33.100:8000/announce';
var files = [];

MongoClient.connect("mongodb://192.168.33.100:27017/test", function(err, db) {

    function checkNewFiles() {
        fs.readdir(dir, function(err, files) {
            files.forEach(function(file) {
                file = dir + file;
                seed(file);
            });
        });
        
        setTimeout( checkNewFiles, 10000 );
    }
    
    
    function seed(file) {
        if(files.indexOf(file) != -1){
            return false;
        }        
        
        client.seed(file, {announceList: [[tracker]]} , function (torrent) {

            torrent.on('wire', function (wire, addr) {
                console.log('connected to peer with address ' + addr)
            });

            torrent.on('upload', function(bytes) {
                console.log('upload: '+bytes);
            });

            saveToDB(torrent);
            
            files.push(file);

        });
    }
    
    function saveToDB(torrent) {
        var collection = db.collection('backups');
        collection.find({infoHash: torrent.infoHash}).toArray(function(err, docs) {
            if (docs.length == 0) {
                collection.insert({infoHash: torrent.infoHash});
                console.log('Add new file to DB');
            }
        });
    }
    
    checkNewFiles();

});