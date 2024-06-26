import React, { useState, useRef } from 'react';

const formatTime = (time) => {
  const getMilliseconds = `0${time % 1000}`.slice(-3);
  const seconds = Math.floor(time / 1000);
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = Math.floor(seconds / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
};

export const Stopwatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const countRef = useRef(null);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const handleStop = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Stopwatch</h1>
        <p className="text-3xl">{formatTime(time)}</p>
      </div>
      <div className="space-x-4 mb-8">
        {!isActive && isPaused && time === 0 && (
          <button onClick={handleStart} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Start
          </button>
        )}
        {isActive && !isPaused && (
          <button onClick={handlePause} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
            Pause
          </button>
        )}
        {isActive && isPaused && time > 0 && (
          <button onClick={handleResume} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Resume
          </button>
        )}
        {isActive && !isPaused && (
          <button onClick={handleStop} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Stop
          </button>
        )}
        <button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Reset
        </button>
        {isActive && !isPaused && (
          <button onClick={handleLap} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Lap
          </button>
        )}
      </div>
      <div className="w-full max-w-md">
        {laps.map((lap, index) => (
          <div key={index} className="flex justify-between py-2 px-4 bg-white bg-opacity-10 rounded mb-2">
            <span>Lap {index + 1}</span>
            <span>{formatTime(lap)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};