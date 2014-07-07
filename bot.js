// Get redis client.
var redis = require('./redis');

var DHT = require('bittorrent-dht');

var dht = new DHT();

// Port 6881 works best.
var dhtPort = process.env.DHT_PORT || 6881;

dht.listen(dhtPort, function () {
  console.info('Bot started listening on port ' + dhtPort);
});

dht.on('peer', function (addr, infoHash, from) {
  console.info('Found potential peer ' + addr + ' through ' + from);
  // Store peers.
  // get id for result
  // Score: FIRST time peer has been added
  redis.zrank('m:' + infoHash + ':p', addr, function (err, exists) {
    if (!exists) {
      redis.zadd('m:' + infoHash + ':p', new Date().getTime(), addr);
    }
  });
  // Update points of corresponding magnet.
  // Points: Number of peers that have been added within the last n ms.
  var stop = new Date().getTime();
  var start = stop - 100*60*10; // 10 minutes
  redis.zcount('m:' + infoHash + ':p', start, stop, function (err, numberOfPeers) {
    redis.hmset('m:' + infoHash, 'ps', numberOfPeers);
    // Store historical points, so they can be easily graphed later on.
    // stop = current timestamp, no need to regenerate it.
    redis.zadd('m:' + infoHash + ':ps', stop, numberOfPeers);
    redis.zadd('m:top', numberOfPeers, infoHash);
  });
});

// Used for building the graph.
dht.on('node', function (addr, nodeId, from) {
  console.info('Found potential node ' + addr + ' through ' + from);
  redis.sadd('edges', from + '-' + addr);
});

var crawl = function (infoHash, callback) {
  console.info('Crawling ' + infoHash);
  // dht.lookup('CE9FBDAA734CFBC160E8EF9D29072646C09958DD');
  // Issue lookup multiple times (UDP packages might get lost).
  var counter = 0;
  var lookup = function () {
    console.info(++counter +'. lookup on ' + infoHash);
    dht.lookup(infoHash);
    if (counter === 10) {
      // We don't want to keep on executing the anonymous function every n
      // seconds if there is no peer having this torrent.
      clearInterval(timer);
      console.info('Stop lookup on bootstraped nodes for ' + infoHash);
    }
  };
  // Lookup ASAP, don't wait 100 ms.
  lookup();
  var timer = setInterval(lookup, 100);
};

var crawlNext = function () {
  // Heads up! This seems to be blocking!
  redis.lpop('m:crawl', function (err, infoHash) {
    if (err) {
      console.error('Failed to retrieve crawl job: ' + err.message);
    } else if (infoHash) {
      // Emulate ring buffer.
      redis.rpush('m:crawl', infoHash);
      crawl(infoHash);
    }
  });
};

// Don't lookup before dht is ready (started listening).
dht.on('ready', function () {
  // Invoke crawlNext, since we don't want to wait 10 seconds before we start
  // retrieving the first crawl job.
  crawlNext();
  // Retrieve and crawl next Magnet URI every 10 seconds.
  setInterval(crawlNext, 10000);
});
