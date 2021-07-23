import { atom } from 'recoil';
import { Resident } from '../../services/resident/model';



export const showResidentModalState = atom<boolean>({
  key: 'showResidentModalState',
  default: false,
});

export const selectedResidentState = atom<Resident | undefined>({
  key: 'selectedResidentState',
  default: undefined,
});
