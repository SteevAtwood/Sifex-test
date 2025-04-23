import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";

const Game = React.lazy(() =>
  import("./Pages/Game/Game").then((module) => ({
    default: module.Game,
  }))
);

const Fallback = () => <div>Загрузка...</div>;

export const App = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/game" />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Suspense>
  );
};
