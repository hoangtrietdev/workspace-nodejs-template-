import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { UsePaginate } from "../../services/base/paginate";
import { useResidents1List } from "../../services/resident1";

import { Resident1 } from "../../services/resident/model";

export type Resident1Context = {
  list: UsePaginate<Resident1>;
};

const Resident1Context = createContext<Resident1Context | null>(null);

export const Resident1Provider: FC = ({ children }) => {
  const list = useResidents1List();
  console.log(list);

  return (
    <Resident1Context.Provider value={{ list }}>
      {children}
    </Resident1Context.Provider>
  );
};

export const useResidences1Context = () => {
  const context = useContext(Resident1Context);
  if (!context) {
    throw new Error(
      "useResidences1context must be used inside Resident1Provider"
    );
  }

  return context;
};

export default Resident1Provider;
