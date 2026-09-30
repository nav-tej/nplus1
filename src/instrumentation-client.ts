import { initBotId } from "botid/client/core";

// Vercel BotID: invisible bot check on the public form endpoints. The server half
// is checkBotId() in each route. Keep this list in sync with those routes.
initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/lead-magnet", method: "POST" },
  ],
});
