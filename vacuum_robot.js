// modules
const readline = require('readline');
const fs = require('fs');

// Global Variables
const data = [];
let directions = [];
let roomDimensions = [];
let dirtLocations = [];
let robotPosition = [];
let numOfDirtMoundsCleaned = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream('./test.txt')
});

readInterface.on('line', (line) => 
    { data.push(line) }
    )
    .on('close', () => {
      splitData(data);
      makeMoves(directions);
      console.log(`Final Robot Position: ${robotPosition[0]}, ${robotPosition[1]}`);
      console.log("Number of Dirt Mounds Cleaned: ", numOfDirtMoundsCleaned);
    });

const splitData = (txt) =>{
    /* Split the data into the relevant components. */
    // Dimensions are the first line of the text input.
    roomDimensions = data[0].split(' ').map((string)=> parseInt(string));

    //Starting location is the second line of the text input.
    robotPosition = data[data.length-2].split(' ').map((string)=> parseInt(string));
 
    //Directions are always on the last line of the text input.
    directions = data[data.length-1].split('');

    //Dirt locations are between the second line and the last line (can be zero or many).
    if(data.length > 3){
        dirtLocations = data.slice(1, data.length-2);
    }
}

// Move the robot based on the directions data
const makeMoves = (directions) => {
    directions.forEach((move)=>{
        switch(move){
            case 'N':
                if(robotPosition[1] + 1 <= roomDimensions[1]){
                    robotPosition[1]++;
                    cleanIfDirty(`${robotPosition[0]} ${robotPosition[1]}`);
                } 
                break;
            case 'E':
                if(robotPosition[0] + 1 <= roomDimensions[0]){
                    robotPosition[0]++;
                    cleanIfDirty(`${robotPosition[0]} ${robotPosition[1]}`);
                }
                break;
            case 'S':
                if(robotPosition[1] - 1 >= 0){
                    robotPosition[1]--;
                    cleanIfDirty(`${robotPosition[0]} ${robotPosition[1]}`);
                }
                break;
            case 'W':
                if(robotPosition[0] - 1 >= 0){
                    robotPosition[0]--;
                    cleanIfDirty(`${robotPosition[0]} ${robotPosition[1]}`);
                }
                break;
        }
    })
}

//If the current robot position is dirty, clean it, increment count, and remove from dirtLocations array.  
const cleanIfDirty = (robotPosition) => {
   if(dirtLocations.includes(robotPosition)){
       dirtLocations.splice(dirtLocations.indexOf(robotPosition), 1);
       numOfDirtMoundsCleaned++;
   }
}
