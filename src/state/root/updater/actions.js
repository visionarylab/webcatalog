import {
  SET_UPDATER_STATUS,
} from '../../../constants/actions';

// eslint-disable-next-line
export const setUpdaterStatus = status => ({
  type: SET_UPDATER_STATUS,
  status,
});