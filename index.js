/*
 * CLI program that takes 
 * room dimensions, locations of dirt patches, a hoover location and driving instructions 
 * as input and outputs the following:
 *  - The final hoover position (X, Y)
 *  - The number of patches of dirt the robot cleaned up
 *  - Graphical representations of rooms before and after being cleaned by the robot
 * @author Jae Park
 */

// Modules
const readline = require("readline");
const fs = require("fs");

// Classes
const RoomBuilder = require("./classes/roomBuilder");
const VacuumBot = require("./classes/vacuumBot");

// Global Variables
const data = [];
const roomGridLegend =
  "[ (D) - dirt mound | (R) - robot location | (.) - empty space ]";

const textFileReader = readline.createInterface({
  input: fs.createReadStream("./test.txt")
});

textFileReader
  .on("line", line => {
    data.push(line);
  })
  .on("close", () => {
    main();
  });

const main = () => {
  // Dimensions are the first line of the text input
  let roomDimensions = data[0].split(" ").map(string => parseInt(string));

  // Starting location is the second line of the text input
  let robotPosition = data[1].split(" ").map(string => parseInt(string));

  // Directions are always on the last line of the text input
  let directions = data[data.length - 1].split("");

  /**
   * Dirt locations are between the second line and the last line (can be zero or many).
   * Because all other params are required, assume length is always at least 3.
   */
  let dirtLocations = [];

  if (data.length > 3) {
    dirtLocations = data.slice(2, data.length - 1);
  }

  // Create a payload object for a RoomBuilder with data from text file
  const initialDataPayload = {
    roomDimensions,
    robotPosition,
    directions,
    dirtLocations
  };

  // Create a new VacuumBot to clean the room
  const vacuumBot = new VacuumBot(initialDataPayload);
  vacuumBot.cleanRoom();
  // Get the results from VacuumBot (I.e. final pos and number of dirt mounds cleaned)
  vacuumBot.showResults();

  // Show the data from text file
  console.log("\n------------ ROOM DATA --------------");
  console.log(`Room Dimensions: ${roomDimensions[0]}x${roomDimensions[1]}`);
  console.log(`Robot Starting Position: ${robotPosition}`);
  console.log(`Dirt Locations: ${dirtLocations}`);
  console.log("-------------------------------------");

  // Create a room with RoomBuilder before it is cleaned
  const roomBuilderBefore = new RoomBuilder(initialDataPayload);
  const roomBefore = roomBuilderBefore.buildRoom();
  console.log("\nBefore Cleaning");
  console.log(roomGridLegend + "\n");
  console.log(roomBefore);

  // Create a new payload object for a RoomBuilder with new room data
  const afterDataPayload = {
    roomDimensions,
    robotPosition: vacuumBot.position,
    directions,
    dirtLocations: vacuumBot.dirtLocations
  };

  // Get a new room after the VacuumBot has finished cleaning
  const roomBuilderAfter = new RoomBuilder(afterDataPayload);
  const roomAfter = roomBuilderAfter.buildRoom();
  console.log("\nAfter Cleaning");
  console.log(roomGridLegend + "\n");
  console.log(roomAfter);
};
