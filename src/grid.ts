import { mod } from "./util";

class Grid {
  readonly width: number;
  readonly height: number;
  private lifeStatus: boolean[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.lifeStatus = Array<boolean>(width * height).fill(false);
  }

  private getIndex(x: number, y: number): number {
    x = mod(x, this.width);
    y = mod(y, this.height);

    return y * this.width + x;
  }

  private setCellLifeStatus(x: number, y: number, value: boolean): void {
    this.lifeStatus[this.getIndex(x, y)] = value;
  }

  private countLiveNeighbors(x: number, y: number): number {
    const neighbors = [
      this.getCellLifeStatus(x - 1, y - 1),
      this.getCellLifeStatus(x - 1, y),
      this.getCellLifeStatus(x - 1, y + 1),
      this.getCellLifeStatus(x, y - 1),
      this.getCellLifeStatus(x, y + 1),
      this.getCellLifeStatus(x + 1, y - 1),
      this.getCellLifeStatus(x + 1, y),
      this.getCellLifeStatus(x + 1, y + 1),
    ];

    return neighbors.filter(Boolean).length;
  }

  private clone(): Grid {
    const newGrid = new Grid(this.width, this.height);
    newGrid.lifeStatus = [...this.lifeStatus];
    return newGrid;
  }

  getCellLifeStatus(x: number, y: number): boolean {
    return this.lifeStatus[this.getIndex(x, y)];
  }

  toggleCellLifeStatus(x: number, y: number): Grid {
    const newGrid = this.clone();
    const cellLifeStatus = newGrid.getCellLifeStatus(x, y);
    newGrid.setCellLifeStatus(x, y, !cellLifeStatus);
    return newGrid;
  }

  step(): Grid {
    const newGrid = new Grid(this.width, this.height);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        const liveNeighbors = this.countLiveNeighbors(x, y);
        const isAlive = this.getCellLifeStatus(x, y);

        if (liveNeighbors === 3 || (isAlive && liveNeighbors === 2)) {
          newGrid.setCellLifeStatus(x, y, true);
        }
      }
    }

    return newGrid;
  }

  resize(width: number, height: number): Grid {
    const newGrid = new Grid(width, height);

    for (let x = 0; x < Math.min(this.width, newGrid.width); x++) {
      for (let y = 0; y < Math.min(this.height, newGrid.height); y++) {
        const cellLifeStatus = this.getCellLifeStatus(x, y);
        newGrid.setCellLifeStatus(x, y, cellLifeStatus);
      }
    }

    return newGrid;
  }

  isEqual(grid: Grid): boolean {
    if (this.width !== grid.width) return false;
    if (this.height !== grid.height) return false;
    if (this.lifeStatus.length !== grid.lifeStatus.length) return false;

    return this.lifeStatus.every((el, i) => el === grid.lifeStatus[i]);
  }
}

export default Grid;
