import { Actionable, AllMiddlewareArgs, BlockAction, Block, SlackActionMiddlewareArgs, SectionBlock } from '@slack/bolt';

const actionMarkDoneCallback = async ({ ack, client, body }:
  AllMiddlewareArgs & SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    await ack();
    // console.log('Action triggered', body);

    const action = body.actions[0];

    const { blocks } = (body.message!);

    // Find the block with the action's `block_id`
    const block: SectionBlock = blocks.find((b: Block) => {
      if (b.type !== 'section') return false;
      if ('accessory' in b) {
        return (b.accessory as Actionable)?.action_id === action.action_id;
      }
      return false;
    });
    // Update the block's text to strikethrough
    block.text!.text = `:white_check_mark: ${block.text!.text}`;
    // Update the message with the updated blocks

    await client.chat.update({
      channel: body.channel!.id,
      ts: body.message!.ts!,
      blocks: body.message!.blocks,
    });
  } catch (error) {
    console.error(error);
  }
};

export default actionMarkDoneCallback;
