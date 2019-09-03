// Modules
const readline = require('readline');
const fs = require('fs');

// Global Variables
const data = [];
let directions = [];
let roomDimensions = [];
let dirtLocations = [];
let robotPosition = [];
let room = '';
let numOfDirtMoundsCleaned = 0;

// Parses text file to extract room data
const textFileReader = readline.createInterface({
        input: fs.createReadStream('./test.txt')
    });
    
    textFileReader.on('line', (line) => 
        { data.push(line) }
        )
        .on('close', () => {
          splitData(data);
          makeMoves(directions);
          showResults();
        });

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
    
    showData();

    console.log("\nBEFORE CLEANING");  
    buildRoom();
}

const showData = () => {
    console.log("\n------------ DATA GATHERED ------------");
    console.log(`Room Dimensions: ${roomDimensions[0]}x${roomDimensions[1]}`);
    console.log(`Robot Starting Position: ${robotPosition}`);
    console.log(`Dirt Locations: ${dirtLocations}`);
    console.log("---------------------------------------");
}

// Fills room array based on dimensions of input
const buildRoom = () => {
    // Legend for grid values
    console.log("[ (D) - dirt mound | (R) - robot location | (.) - empty space ]");

    for(let i = 0; i < roomDimensions[1]; i++){
        let gridRow = '';
        for(let j = 0; j <= roomDimensions[0]; j++){
            // Simulate a y-axis by using the 0th index of each row
            if(j === 0){
                if(roomDimensions[1] - i < 10){
                    gridRow+=(` ${ roomDimensions[1] - i } `);
                }
                 if(roomDimensions[1] - i >= 10){
                    gridRow+=(`${ roomDimensions[1] - i } `);
                }
                
            } else if (dirtLocations.includes(`${j} ${roomDimensions[1]- i}`)) {
                gridRow+='(D)';
            } else if (robotPosition[0] === parseInt(j) && robotPosition[1] === roomDimensions[1] - parseInt(i)){
                gridRow+='(R)';
            }
            else {
                gridRow+=' . ';
            }
        }
        gridRow+= '\n';
        room+=gridRow;
    }

    // Simulate x-axis with last row by filling with numbers unless dirt is there
    let lastRow = '';
    for(let i = 0; i <= roomDimensions[0]; i++){
        if(dirtLocations.includes(`${i} 0`)){
            lastRow+= `(D)`;
        } else {
            if(i < 10){
              lastRow+=` ${i} `;
            } else if(i >= 10){
              lastRow+=`${i} `; 
            }
           
        }
    }

    room+=lastRow;
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
    console.log("\nAFTER CLEANING");
    buildRoom();
    console.log(`\nFinal Robot Position: ${robotPosition[0]}, ${robotPosition[1]}`);
    console.log("Number of Dirt Mounds Cleaned: ", numOfDirtMoundsCleaned);
}