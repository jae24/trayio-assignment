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

  /**
   * Create a payload object for a RoomBuilder with data from text file.
   * Instances of VacuumBot update this data.
   */
  const dataPayload = {
    roomDimensions,
    robotPosition,
    directions,
    dirtLocations
  };

  // Create a room with RoomBuilder before it is cleaned
  const roomBuilderBefore = new RoomBuilder(dataPayload);
  const roomBefore = roomBuilderBefore.buildRoom();

  // Create a new VacuumBot to clean the room
  const vacuumBot = new VacuumBot(dataPayload);
  vacuumBot.cleanRoom();
  // Get the results from VacuumBot (I.e. final pos and number of dirt mounds cleaned)
  console.log("\n-------------- RESULTS --------------");
  vacuumBot.showResults();
  console.log("-------------------------------------");

  // Create a new room with RoomBuilder after the VacuumBot has finished cleaning
  const roomBuilderAfter = new RoomBuilder(dataPayload);
  const roomAfter = roomBuilderAfter.buildRoom();

  // Show room before and after
  console.log("\nBefore Cleaning");
  console.log(roomGridLegend + "\n");
  console.log(roomBefore);
  console.log("\nAfter Cleaning");
  console.log(roomGridLegend + "\n");
  console.log(roomAfter);
};
