/*
 * VacuumBot takes room data and stores it in its memory before cleaning it.
 */
class VacuumBot {
  /**
   * Creates an instance of VacuumBot.
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
   * Cleans the room stored in memory while updating room data.
   * Limiters for if conditions are boundaries of the room.
   */
  cleanRoom() {
    this.directions.forEach(move => {
      switch (move.toUpperCase()) {
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
      `Final Robot Position: ${this.position[0]}, ${this.position[1]}`
    );
    console.log("Number of Dirt Mounds Cleaned: ", this.numOfDirtMoundsCleaned);
  }
}

module.exports = VacuumBot;
