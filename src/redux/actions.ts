import { ActionType } from 'typesafe-actions';
import * as forecastActions from './forecast/actions';
import * as tripsActions from './trips/actions';
import * as userActions from './user/actions';

const allActions = {
  forecastActions,
  tripsActions,
  userActions,
};

export type GlobalAppActions = ActionType<typeof allActions>;
