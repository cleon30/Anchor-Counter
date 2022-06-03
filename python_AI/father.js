/* Generate a python process using nodejs child_process module */
var spawn = require('child_process').spawn,
    py_process = spawn('python3', ['son.py']),
    data = getData(),
    dataResult = '';

/* Define what to do on everytime node application receives data from py_process */
py_process.stdout.on('data', function(data){
    dataResult += data.toString();
});

/* At the end, show the result from py_process computing (stored in 'dataResult') */
py_process.stdout.on('end', function(){
    console.log('Sum result: ', dataResult);
});

/* Stringify the array before send to py_process */
py_process.stdin.write(JSON.stringify(data));

/* Close the stream */
py_process.stdin.end();

function getData() {
    return [1, 8, 16, 32, 64, 128, 256];
}