import pipedream_utils from "../../pipedream_utils.app.mjs";

export default {
  key: "pipedream_utils-trigger-workflow",
  name: "Helper Functions - Trigger Workflow",
  description: "Trigger another Pipedream workflow in your workspace.",
  version: "0.0.1",
  type: "action",
  props: {
    pipedream_utils,
    workflowId: {
      type: "string",
      label: "Workflow ID",
      description: "The ID of the workflow to trigger. Workflow IDs are formatted as `p_******` and you can find a workflow’s ID within the workflow builder URL.",
    },
    event: {
      type: "object",
      label: "Event",
      description: "The event to be sent to the triggered workflow as the triggering event. In the triggered workflow, you can reference this event object with a custom expression (e.g., `{{steps.trigger.event}}`).",
      optional: true,
    },
  },
  async run({ $ }) {
    const {
      workflowId,
      event = {},
    } = this;

    const result = await $.flow.trigger(workflowId, event);

    $.export("$summary", `Successfully triggered workflow ID **${workflowId}**`);

    return result;
  },
};
