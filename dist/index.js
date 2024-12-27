"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const gameLogic_1 = require("./gameLogic");
const app = (0, express_1.default)();
const port = 3000;
// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// API endpoint to check if the board is solved
app.post('/check-win', express_1.default.json(), (req, res) => {
    const { board } = req.body;
    const solved = (0, gameLogic_1.isBoardSolved)(board);
    res.json({ solved });
});
// Serve the app on port 3000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
