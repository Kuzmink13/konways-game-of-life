import { useState } from "react";
import Grid from "./grid";
import { useInterval } from "./useInterval";

const initialConditions = {
  width: 50,
  height: 25,
};

function App() {
  const [isAuto, setIsAuto] = useState(false);
  const [grid, setGrid] = useState(
    new Grid(initialConditions.width, initialConditions.height)
  );

  const step = () => {
    const nextGrid = grid.step();

    if (!grid.isEqual(nextGrid)) {
      setGrid(nextGrid);
    }
  };

  const toggle = (x: number, y: number) => {
    setGrid(grid.toggleCellLifeStatus(x, y));
  };

  const reset = () => {
    setGrid(new Grid(initialConditions.width, initialConditions.height));
    setIsAuto(false);
  };

  const toggleIsAuto = () => {
    setIsAuto((previous) => !previous);
  };

  useInterval(step, isAuto ? 250 : null);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold text-blue-300 m-10 drop-shadow-2xl">
        Konway's Game of Life
      </h1>
      <div className="flex flex-col bg-slate-600/50 p-2 border rounded-lg backdrop-blur-lg border-slate-500 shadow-lg">
        {Array(grid.height)
          .fill(undefined)
          .map((_, y) => (
            <div className="flex flex-row" key={y}>
              {Array(grid.width)
                .fill(undefined)
                .map((_, x) => (
                  <div
                    key={x}
                    className={`h-4 w-4 border cursor-pointer border-slate-900 m-[2px] rounded-md ${
                      grid.getCellLifeStatus(x, y) ? "bg-blue-400" : ""
                    }`}
                    onClick={() => toggle(x, y)}
                  />
                ))}
            </div>
          ))}
      </div>
      <div className="btn-group m-10 shadow-md">
        <button className="btn w-28 btn-secondary" onClick={reset}>
          Reset
        </button>
        <button
          className="btn w-28 btn-secondary"
          onClick={step}
          disabled={isAuto}
        >
          Step
        </button>
        <button
          className={`btn w-28 ${isAuto ? "btn-error" : "btn-primary"}`}
          onClick={toggleIsAuto}
        >
          {isAuto ? "Stop" : "Auto Step"}
        </button>
      </div>
    </div>
  );
}

export default App;
