import { AllMiddlewareArgs, BlockAction, SlackActionMiddlewareArgs } from '@slack/bolt';

const sampleActionCallback = async ({ ack, client, body }:
  AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    console.log('Action triggered', body);
    await client.chat.update({
      channel: body.channel!.id,
      ts: body.message!.ts!,
      text: 'Message updated!',
    });
  } catch (error) {
    console.error(error);
  }
};

export default sampleActionCallback;
