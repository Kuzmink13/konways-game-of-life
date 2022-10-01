import { useEffect, useState } from "react";
import Grid from "./grid";
import { useInterval } from "./useInterval";

type GridSize = {
  width: number;
  height: number;
};

const getGridSize = (screenWidth: number): GridSize => {
  if (screenWidth < 640) return { width: 15, height: 25 };
  if (screenWidth < 1024) return { width: 25, height: 25 };
  return { width: 45, height: 25 };
};

function App() {
  const [isAuto, setIsAuto] = useState(false);
  const [grid, setGrid] = useState(() => {
    const { width, height } = getGridSize(window.innerWidth);
    return new Grid(width, height);
  });

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = getGridSize(window.innerWidth);

      setGrid((previous) => {
        if (previous.width === width && previous.height === height) {
          return previous;
        } else {
          return previous.resize(width, height);
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    const { width, height } = getGridSize(window.innerWidth);
    setGrid(new Grid(width, height));
    setIsAuto(false);
  };

  const toggleIsAuto = () => {
    setIsAuto((previous) => !previous);
  };

  useInterval(step, isAuto ? 250 : null);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl sm:text-5xl font-bold text-blue-300 m-6 sm:m-10 drop-shadow-2xl">
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
