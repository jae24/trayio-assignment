/*
 * RoomBuilder creates a graphical representation of a room given room data.
 */
class RoomBuilder {
  /**
   * Creates an instance of RoomBuilder.
   * @constructor
   * @param roomData An Object containing room data.
   */
  constructor(roomData) {
    this.dimensions = roomData.roomDimensions;
    this.dirtLocations = roomData.dirtLocations;
    this.robotPosition = roomData.robotPosition;
  }

  /**
   * Returns a grid representation of a room as a string.
   * @return The room as a string.
   */
  buildRoom() {
    let room = ''
    for (let i = 0; i < this.dimensions[1]; i++) {
      let gridRow = "";
      for (let j = 0; j <= this.dimensions[0]; j++) {
        // Simulate a y-axis by using the 0th index of each row
        if (j === 0) {
          // Change padding of numbers on axis depending on value
          if (this.dimensions[1] - i < 10) {
            gridRow += ` ${this.dimensions[1] - i} `;
          } else if (this.dimensions[1] - i >= 10) {
            gridRow += `${this.dimensions[1] - i} `;
          } // Check if a point is a dirt mound location or location of a VacuumBot
        } else if (
          this.dirtLocations.includes(`${j} ${this.dimensions[1] - i}`)
        ) {
          gridRow += "(D)";
        } else if (
          this.robotPosition[0] === parseInt(j) &&
          this.robotPosition[1] === this.dimensions[1] - parseInt(i)
        ) {
          gridRow += "(R)";
        } else {
          gridRow += " . ";
        }
      }
      gridRow += "\n";
      room += gridRow;
    }

    // Simulate an x-axis with last row by filling with numbers unless it is a dirt location
    let lastRow = "";
    for (let i = 0; i <= this.dimensions[0]; i++) {
      if (this.dirtLocations.includes(`${i} 0`)) {
        lastRow += `(D)`;
      } else {
        // Change padding of numbers on axis depending on value
        if (i < 10) {
          lastRow += ` ${i} `;
        } else if (i >= 10) {
          lastRow += `${i} `;
        }
      }
    }
    room += lastRow;
    return room;
  }
}

module.exports = RoomBuilder;
