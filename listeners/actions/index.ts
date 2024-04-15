import { App } from '@slack/bolt';
import sampleActionCallback from './sample-action';
import actionMarkDoneCallback from './action-mark-done';

const register = (app: App) => {
  app.action('sample_action_id', sampleActionCallback);
  app.action('release_notes_done', actionMarkDoneCallback);
  app.action('release_merge_done', actionMarkDoneCallback);
  app.action('release_announcement_done', actionMarkDoneCallback);
};

export default { register };
