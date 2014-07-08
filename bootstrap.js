// Inserts some sample data. Used primarily for development.

var request = require('request');
var _ = require('lodash');
var port = process.env.PORT || 3141;

_.each([  'magnet:?xt=urn:btih:c0664234b44f25de6cc7b536a798c65f858079cb&dn=Noah+%282014%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:4015ab9713a0ff6e12167c5d71eba4c5975f8669&dn=Transcendence+%282014%29+WEB-DL+XviD-MAX&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:e2191fbabed07b10ef6055ec0c45e1f842c5b7ec&dn=The+Other+Woman+2014+DVDScr+XViD+AC3-BL4CKP34RL&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:9332189cf9d377607eab9a666e4662cd135cd5c9&dn=True+Blood+S07E03+HDTV+x264-KILLERS%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:9b9c9ff5558d2d2bf40c7f9caecfce55480ebfef&dn=Game+of+Thrones+S04E10+HDTV+x264-KILLERS%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:05d4dbcdc04baa8351a1f9a42ff9b6b73ab8404d&dn=Heaven+Is+for+Real+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:6319f9b0d0e13a5cfea68911b7b52488da2d8005&dn=Falling+Skies+S04E03+HDTV+x264-2HD+%5Beztv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:aa10d64976320bdc0aaab2682d2998516a9f8264&dn=Game+of+Thrones+S04E09+HDTV+x264-KILLERS%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:344e74a9b07ec8d3f00627a38f45483a3db08a04&dn=300+Rise+of+an+Empire+%282014%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:f817191cac3ec5832b789d39a9b1a2a6c0b43708&dn=Rio+2+%282014%29+1080p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:04f674157cfba3b0ae0810ee392c4fb123d0bce8&dn=A.Million.Ways.To.Die.In.The.West.2014.WEBRip.HC.XviD.MP3-RARBG&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:2e151ae57f26e8dba9faa0566deeb67fb40011b7&dn=True+Blood+S07E03+HDTV+x264-KILLERS+%5Beztv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:5362d0319ec69767bb339861316fd3db45be69d2&dn=Captain.America.The.Winter.Soldier.2014.720p.HDTV.XviD.AC3-VAiN&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337  ',
  'magnet:?xt=urn:btih:caab3cb4b58116733397934793f869ebff8e14ea&dn=Non-Stop+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:ad9b915cb29acdfbdc4031df17cb318c800ed42c&dn=Game+of+Thrones+S04E08+HDTV+x264-KILLERS%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:7f5523d8880fb423b9546af73c2419a2f3cb2ae8&dn=X-Men.Days.Of.Future.Past.2014.HD-TS.XVID.AC3.HQ.Hive-CM8&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:53c5866ebf244901bd0f2acb0e014dab3c0937ef&dn=The+Last+Ship+S01E03+HDTV+x264-LOL%5Bettv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:3a0c37e5329ab205d5bf752c52694914e61e0004&dn=The+Grand+Budapest+Hotel+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:17bc0989c415736bd5748a276233e56bb37c30af&dn=The+Lego+Movie+%282014%29+720p+BrRip+x264+-+YIFY&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337',
  'magnet:?xt=urn:btih:109f9bafb2a11a7b8055ae7c275be563ed28b0cd&dn=22.Jump.Street.2014.CAM.NEW.AUDIO.XviD.MP3-RARBG&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Fopen.demonii.com%3A1337'
  ], function (uri) {
  request.post('http://localhost:' + port + '/submit', {form: {'magnet-uri': uri}});
});
