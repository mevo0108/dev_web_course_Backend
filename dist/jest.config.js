"use strict";
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: "ts-jest",
    testEnvironment: 'node',
    setupFiles: ["./jest.setup.ts"],
    roots: ["<rootDir>/src/tests"],
};
//# sourceMappingURL=jest.config.js.map