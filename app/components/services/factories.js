app.factory('serviceStorage', function() {
 var savedData = {}
 function set(key, value) {
    console.log("serviceStorage, set():", key, value);
    savedData[key] = value;
 }
 function get(key) {
    console.log("serviceStorage, get():", key, savedData[key]);
    return savedData[key];
 }

 return {
  set: set,
  get: get
 }
});