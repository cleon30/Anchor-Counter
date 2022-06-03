/* Generate a python process using nodejs child_process module */
var spawn = require('child_process').spawn,
    py_process = spawn('python3', ['detection.py']),
    data = getData(),
    Data_Result_Dog = 0;
    Data_Result_Cat = 0;
    dataResult = '';

/* Define what to do on everytime node application receives data from py_process */
py_process.stdout.on('data', function(data){
    dataResult += data.toString();
});

/* At the end, show the result from py_process computing (stored in 'dataResult') */
py_process.stdout.on('end', function(){
    console.log(dataResult);
});

/* Stringify the array before send to py_process */
py_process.stdin.write(JSON.stringify(data));

/* Close the stream */
py_process.stdin.end();

function getData() {
    return 'https://assets.geekinsider.com/wp-content/uploads/2021/08/shiba_inu_dog_doge_meme_spitz_breeds_japanese-661259.jpgd_.jpeg';
}