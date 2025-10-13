const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>/"],
});

module.exports = jestConfig;

/** 
Utiliza o dir: "./" para definir a raiz e referenciar onde
a configuração irá buscar o .env

Em contra partida, o projeto utiliza o .env.development para definir 
as variáveis de ambiente, para resolver isso é necessário definir o path
do .env.development através do dotenv.config({ path: ".env.development" });**/