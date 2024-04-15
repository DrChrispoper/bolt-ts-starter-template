import { AllMiddlewareArgs, GenericMessageEvent, SlackEventMiddlewareArgs } from '@slack/bolt';

const sampleMessageCallback = async (params: AllMiddlewareArgs & SlackEventMiddlewareArgs<'message'>) => {
  const { message, say } = params;
  try {
    const { user } = (message as GenericMessageEvent);
    const userDetails = await params.client.users.info({ user });

    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Hey there <@${userDetails.user?.name}>!`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Click Me',
            },
            action_id: 'sample_action_id',
          },
        },
      ],
    });
  } catch (error) {
    console.error(error);
  }
};

export default sampleMessageCallback;
