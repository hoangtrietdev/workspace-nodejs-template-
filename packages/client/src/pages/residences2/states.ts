import { atom } from 'recoil';
import { Resident } from '../../services/resident/model';



export const showResidentModalState = atom<boolean>({
  key: 'showResident2ModalState',
  default: false,
});

export const selectedResidentState = atom<Resident | undefined>({
  key: 'selectedResident2State',
  default: undefined,
});
