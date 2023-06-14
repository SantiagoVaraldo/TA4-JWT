"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoute = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const jwt = __importStar(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.route('/api/login')
    .post(loginRoute);
const RSA_PRIVATE_KEY = fs.readFileSync('src/private.key');
function loginRoute(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (email && password) {
        const userId = '1';
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: 120,
            subject: userId
        });
        // send the JWT back to the user
        // TODO - multiple options available
        res.cookie("SESSIONID", jwtBearerToken, { httpOnly: false, secure: false });
        res.sendStatus(200);
    }
    else {
        // send status 401 Unauthorized
        res.sendStatus(401);
    }
}
exports.loginRoute = loginRoute;
const server = http_1.default.createServer(app);
server.listen(3000);
//# sourceMappingURL=index.js.map