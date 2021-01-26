/*
It was my first encounter with Java Script.
However this solution finds very quickly all valid codes and test it against the site.
It should be run in browser console as we need initial bytes array.
It works by recurrence finding all possible combinations of bytes which can give us valid (or almost valid) png file.
*/

function test_bytes(u_in) {
  var key = String(u_in);
  var LEN = 16;
  var shifter;

  var result = [];
  for(var i = 0; i < LEN; i++){
    shifter = key.charCodeAt(i) - 48;
    for(var j = 0; j < (bytes.length / LEN); j ++){
      result[(j * LEN) + i] = bytes[(((j + shifter) * LEN) % bytes.length) + i]
    }
  }
  while(result[result.length-1] == 0){
    result = result.slice(0,result.length-1);
  }
  return result
}

function test_base64(u_in) {
  var key = String(u_in);
  var LEN = 16;
  var shifter;
  var result = [];
  for(var i = 0; i < LEN; i++){
    shifter = key.charCodeAt(i) - 48;
    for(var j = 0; j < (bytes.length / LEN); j ++){
      result[(j * LEN) + i] = bytes[(((j + shifter) * LEN) % bytes.length) + i]
    }
  }
  while(result[result.length-1] == 0){
    result = result.slice(0,result.length-1);
  }
  return btoa(String.fromCharCode.apply(null, new Uint8Array(result)));
};

function isMatch(array1, array2) {
  for(const [key, value] of Object.entries(array1)){
    if(value == array2[Number(key)]) {
      continue;
    } else {
      return false
    }
  }
  return true
}

function rec(start,pass, power) {
  for(var j = 0; j < 10 ; j++) {
    var temp = start + (j * Math.pow(10,power));
    var temp_array = test_bytes(temp).slice(0, 16-power);
    console.log(temp)
    if(isMatch(temp_array, pass)) {
      if(temp_array.length != passw.length) {
          rec(temp, pass, power-1)
      } else if (! founds.includes(temp)) {
          founds.push(temp);
          console.log(founds);
      }
    }
  }
}


function isImage(data1){
  var data = test_base64(data1)
  var image = new Image()

  $(image).on('load', function() {
    console.log(image.src);
    if(image.height === 0 || image.width === 0){
      document.body.appendChild(image);
      return false;

    }
    else {
      console.log(image.src);
      valid_images.push(image.src);
    }
  });

  image.src = "data:image/png;base64,"+ data

}

var passw=[137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82];
var LEN = passw.length;
var power = LEN - 1;
var starts = 0
var founds = []
var valid_images=[]


rec(starts, passw, power)

for(const [key, value] of Object.entries(founds)) {
  isImage(value)
}
