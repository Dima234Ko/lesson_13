module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 60, // Минимальное покрытие для ветвлений
      functions: 60, // Минимальное покрытие для функций
      lines: 60, // Минимальное покрытие для строк
      statements: 60, // Минимальное покрытие для операторов
    },
  },
};