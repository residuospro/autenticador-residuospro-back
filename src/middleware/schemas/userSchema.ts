import { checkSchema } from "express-validator";

export const userCreateSchema = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Nome não fornecido",
  },
  email: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Email não fornecido",
  },
});

export const getUserByRoleSchema = checkSchema({
  page: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Pagina não fornecida",
  },
  itemsPerPage: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
    errorMessage: "Itens por pagina não fornecido",
  },
  role: {
    in: ["body"],
    isArray: true,
    notEmpty: true,
    errorMessage: "Permissão não fornecida",
  },
  idCompany: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Id da empresa não fornecido",
  },
});

export const getUsernameSchema = checkSchema({
  username: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Username não fornecido",
  },
  idCompany: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    errorMessage: "Id da empresa não fornecido",
  },
  role: {
    in: ["body"],
    isArray: true,
    notEmpty: true,
    errorMessage: "Permissão não fornecida",
  },
});
