import React, { FC } from "react";
import Resident1Provider from "./context";
import Residence1List from "./residence1";

const Residences1Screen: FC = () => (
  <div className="min-h-full p-4">
    <div className="mb-4">
      <Resident1Provider>
        <Residence1List />
      </Resident1Provider>
    </div>
  </div>
);

export default Residences1Screen;
