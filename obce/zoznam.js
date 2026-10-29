/*
 * List of villages in the app, in the order shown on the "choose your village" screen.
 * Each id must have a file obce/<id>.js. The id is also the web address: /<id>/
 * After adding a village, also add <script src="/obce/<id>.js"></script> to index.html
 * (the check `node scripts/check-i18n.js` reminds you if you forget).
 */
var OBCE = {};
var OBCE_ZOZNAM = ["cana", "geca"];
