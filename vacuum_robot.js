// Modules
const readline = require('readline');
const fs = require('fs');

// Global Variables
const data = [];
let directions = [];
let roomDimensions = [];
let dirtLocations = [];
let robotPosition = [];
let room = [];
let numOfDirtMoundsCleaned = 0;

const useTextFile = () => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('./test.txt')
    });
    
    readInterface.on('line', (line) => 
        { data.push(line) }
        )
        .on('close', () => {
          console.log("BEFORE CLEANING");  
          splitData(data);
          makeMoves(directions);
          showResults();
        });
}

const splitData = (txt) =>{
    /* Split the data into the relevant components. */
    // Dimensions are the first line of the text input.
    roomDimensions = data[0].split(' ').map((string)=> parseInt(string));

    // Starting location is the second line of the text input.
    robotPosition = data[1].split(' ').map((string)=> parseInt(string));
 
    // Directions are always on the last line of the text input.
    directions = data[data.length-1].split('');

    // Dirt locations are between the second line and the last line (can be zero or many).
    if(data.length > 3){
        dirtLocations = data.slice(2, data.length-1);
    }

    buildRoom();
}

// Fills room array based on dimensions of input
const buildRoom = () => {
    // Legend for grid values
    console.log("[ D - dirt mound, R - robot location, x - empty space ]");

    for(let i = 0; i < roomDimensions[1]; i++){
        let gridRow = [];
        for(let j = 0; j <= roomDimensions[0]; j++){
            // Simulate a y-axis by using the 0th index of each row
            if(j === 0){
                gridRow.push(` ${ roomDimensions[1] - i } `);
            } else {
                gridRow.push(' x ');
            }
        }
        room.push(gridRow);
    }

    // Last row of x-axis must be populated with numbers
    let lastRow = [];
    for(let i = 0; i <= roomDimensions[0]; i++){
        lastRow.push(` ${i} `);
    }

    room.push(lastRow);
    populateRoom();
}

// Helper function to populate the dirt mounds and starting location of robot
const populateRoom = () => {
    let dirtCoordinates = [];

    // Create an array of x,y coordinates from dirtLocations
    dirtLocations.forEach((loc)=>{
        dirtCoordinates.push(loc.split(' '));
    })

    // Convert the strings to numbers
    for(let i = 0; i < dirtCoordinates.length; i++){
        for(let j = 0; j < dirtCoordinates[i].length; j++){
            dirtCoordinates[i][j] = parseInt(dirtCoordinates[i][j]);
        }
    }

    // Place the dirt mounds in the room array
    for(let i = 0; i < dirtCoordinates.length; i++){
       let row = roomDimensions[1] - dirtCoordinates[i][1];
       let col = dirtCoordinates[i][0];
       // Mark dirt with D
       room[row][col] = ' D ';
    }

    // Place the robot in the room array
    let row = roomDimensions[1] - robotPosition[1];
    let col = robotPosition[0];
    // Mark starting location of robot with R
    room[row][col] = ' R ';

    console.log(room);
}

// Move the robot based on the directions data
const makeMoves = (directions) => {
    // Update the robot position for every valid move and clean the coordinate if there is a dirt mound present
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
            default:
                console.log("Invalid Direction detected.");
                break;
        }
    })
}

// If the current robot position is dirty, clean it, increment count, and remove from dirtLocations array
const cleanIfDirty = (robotPosition) => {
   if(dirtLocations.includes(robotPosition)){
       dirtLocations.splice(dirtLocations.indexOf(robotPosition), 1);
       numOfDirtMoundsCleaned++;
   }
}

// Show final results after cleaning the room
const showResults = () => {
    room = [];
    console.log("AFTER CLEANING");
    buildRoom();
    console.log(`Final Robot Position: ${robotPosition[0]}, ${robotPosition[1]}`);
    console.log("Number of Dirt Mounds Cleaned: ", numOfDirtMoundsCleaned);
}

useTextFile();