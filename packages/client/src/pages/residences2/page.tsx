import React, { FC } from "react";
import ResidentProvider from "./context";
import ResidenceList from "./residence";

const ResidencesScreen: FC = () => (
  <div className="min-h-full p-4">
    <div className="mb-4">
      <ResidentProvider>
        <ResidenceList />
      </ResidentProvider>
    </div>
  </div>
);

export default ResidencesScreen;
