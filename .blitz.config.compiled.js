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

// db/index.ts
var db_exports = {};
__export(db_exports, {
  default: () => db_default
});
var import_blitz = __toModule(require("blitz"));
var import_client = __toModule(require("@prisma/client"));
__reExport(db_exports, __toModule(require("@prisma/client")));
var EnhancedPrisma = (0, import_blitz.enhancePrisma)(import_client.PrismaClient);
var db_default = new EnhancedPrisma();

// blitz.config.js
var {sessionMiddleware, simpleRolesIsAuthorized, getSession} = require("blitz");
module.exports = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "cime",
      isAuthorized: simpleRolesIsAuthorized,
      sessionExpiryMinutes: 120
    }),
    async (req, res, next) => {
      const session = await getSession(req, res);
      const handle = session.$handle;
      const f = await db_default.session.findFirst({where: {handle}});
      console.log(f);
      return next();
    }
  ]
};
