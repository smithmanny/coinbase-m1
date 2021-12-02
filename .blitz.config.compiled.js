var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// blitz.config.js
var import_formatDistanceToNowStrict = __toModule(require("date-fns/formatDistanceToNowStrict"));

// app/utils/coinbaseHelpers.ts
var import_blitz = __toModule(require("blitz"));
var refreshTokens = async (refreshToken) => {
  const body = {
    "grant_type": "refresh_token",
    "client_id": process.env.BLITZ_PUBLIC_COINBASE_CLIENT_ID,
    "client_secret": process.env.BLITZ_PUBLIC_COINBASE_CLIENT_SECRET,
    "refresh_token": refreshToken
  };
  try {
    const request = await fetch("https://api.coinbase.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const json = await request.json();
    console.log("New tokens created", json);
    return [json.access_token, json.refresh_token];
  } catch (err) {
    console.log("Failed to create new tokens");
    throw new Error(err);
  }
};

// db/index.ts
var db_exports = {};
__export(db_exports, {
  default: () => db_default
});
var import_blitz2 = __toModule(require("blitz"));
var import_client = __toModule(require("@prisma/client"));
__reExport(db_exports, __toModule(require("@prisma/client")));
var EnhancedPrisma = (0, import_blitz2.enhancePrisma)(import_client.PrismaClient);
var db_default = new EnhancedPrisma();

// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized} = require("blitz");
module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "cime",
      isAuthorized: simpleRolesIsAuthorized,
      sessionExpiryMinutes: 120
    }),
    async (req, res, next) => {
      const refreshToken = res.blitzCtx.session.refreshToken;
      const handle = res.blitzCtx.session.$handle;
      if (handle) {
        const userSession = await db_default.session.findFirst({where: {handle}});
        if (userSession?.expiresAt) {
          const result = (0, import_formatDistanceToNowStrict.default)(userSession.expiresAt, {unit: "minute"}).split(" ");
          const sessionExpiresIn = Number(result[0]);
          if (sessionExpiresIn <= 70) {
            try {
              const [newAccessToken, newRefreshToken] = await refreshTokens(refreshToken);
              await res.blitzCtx.session.$setPublicData({accessToken: newAccessToken, refreshToken: newRefreshToken});
            } catch (error) {
              await res.blitzCtx.session.$revoke();
              throw new Error(error);
            }
          }
        }
      }
      return next();
    }
  ]
};
