import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { UsePaginate } from "../../services/base/paginate";
import { useResidentsList } from "../../services/resident";


import { Resident } from "../../services/resident/model";

export type ResidentContext = {
  list: UsePaginate<Resident>;
};

const ResidentContext = createContext<ResidentContext | null>(null);

export const ResidentProvider: FC = ({ children }) => {
  const list = useResidentsList();

  return (
    <ResidentContext.Provider value={{ list }}>
      {children}
    </ResidentContext.Provider>
  );
};

export const useResidencesContext = () => {
  const context = useContext(ResidentContext);
  if (!context) {
    throw new Error("useResidencescontext must be used inside ResidentProvider");
  }

  return context;
};

export default ResidentProvider;
