import { atom } from 'recoil';
import { Resident1 } from '../../services/resident/model';



export const showResident1ModalState = atom<boolean>({
  key: 'showResident1ModalState',
  default: false,
});

export const selectedResident1State = atom<Resident1 | undefined>({
  key: 'selectedResident1State',
  default: undefined,
});
