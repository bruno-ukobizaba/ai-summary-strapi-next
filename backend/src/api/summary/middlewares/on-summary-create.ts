/**
 * `on-summary-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized("You are not authenticated.");

    const availableCredits = user.credits;
    if (availableCredits === 0)
      return ctx.unauthorized("You do not have enough credits.");

    console.log(`####### Inside middleware #######`);

    // ADD the author id to the body
    const modifiedBody = {
      ...ctx.request.body,
      data: {
        ...ctx.request.body.data,
        authorId: ctx.state.user.documentId,
      },
    };

    ctx.request.body = modifiedBody;
    await next();

    // Update the user's credits
    try {
      await strapi.documents("plugin::users-permissions.user").update({
        documentId: user.documentId,
        data: {
          credits: availableCredits - 1,
        },
      });
    } catch (error) {
      ctx.badRequest("Failed to update user credits.");
    }
    console.log(`####### End of middleware #######`);
  };
};
