/**
 * `is-owner` middleware
 */

import type { Core } from "@strapi/strapi";

/**
 * `is-owner` middleware for Strapi. This middleware checks if the user is the owner of a specific entry or if they have access to a list of entries.
 *
 * @param config - Configuration object for the middleware.
 * @param strapi - Strapi instance.
 *
 * @returns An async function that handles the middleware logic.
 */
export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info("In is-owner middleware.");
    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.documentId;

    if (!userId) return ctx.unauthorized("You can't access this entry.");

    const apiName = ctx.state.route.info.apiName;

    const generateUID = (apiName) => {
      const apiUid = `api::${apiName}.${apiName}`;
      return apiUid;
    };

    const appUid = generateUID(apiName);

    if (entryId) {
      const entry = await strapi.documents(appUid as any).findOne({
        documentId: entryId,
        populate: "*",
      });

      if (entry && entry.authorId !== userId) {
        return ctx.unauthorized("You can't access this entry.");
      }
    }

    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, authorId: userId },
      };
    }

    await next();
  };
};
