/*
 * VacuumBot takes room data and stores it in its memory before cleaning it.
 */
class VacuumBot {
  /**
   * Creates an instance of VacuumBot
   * @constructor
   * @param roomData An Object containing room data.
   */
  constructor(roomData) {
    this.dimensions = roomData.roomDimensions;
    this.dirtLocations = roomData.dirtLocations;
    this.position = roomData.robotPosition;
    this.directions = roomData.directions;
    this.numOfDirtMoundsCleaned = 0;
  }

  /**
   * Cleans the room it is placed in using stored room data, updating room data as it goes.
   */
  cleanRoom() {
    this.directions.forEach(move => {
      switch (move) {
        case "N":
          if (this.position[1] + 1 <= this.dimensions[1]) {
            this.position[1]++;
            this.cleanIfDirty(`${this.position[0]} ${this.position[1]}`);
          }
          break;
        case "E":
          if (this.position[0] + 1 <= this.dimensions[0]) {
            this.position[0]++;
            this.cleanIfDirty(`${this.position[0]} ${this.position[1]}`);
          }
          break;
        case "S":
          if (this.position[1] - 1 >= 0) {
            this.position[1]--;
            this.cleanIfDirty(`${this.position[0]} ${this.position[1]}`);
          }
          break;
        case "W":
          if (this.position[0] - 1 >= 0) {
            this.position[0]--;
            this.cleanIfDirty(`${this.position[0]} ${this.position[1]}`);
          }
          break;
        default:
          console.log("Invalid Direction detected.");
          break;
      }
    });
  }

  /**
   * Cleans a position in the room if it is dirty and removes the dirt location from dirtLocations array.
   * @param positionString the current position of the VacuumBot.
   */
  cleanIfDirty(positionString) {
    if (this.dirtLocations.includes(positionString)) {
      this.dirtLocations.splice(this.dirtLocations.indexOf(positionString), 1);
      this.numOfDirtMoundsCleaned++;
    }
  }

  /**
   * Displays the results of the cleaning.
   */
  showResults() {
    console.log(
      `\nFinal Robot Position: ${this.position[0]}, ${this.position[1]}`
    );
    console.log("Number of Dirt Mounds Cleaned: ", this.numOfDirtMoundsCleaned);
  }
}

module.exports = VacuumBot;
