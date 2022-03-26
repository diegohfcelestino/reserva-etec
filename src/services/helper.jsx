import { hoursToMinutes } from "date-fns";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

export function handleError(method, error) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, status } = error.response;
  let message = "";

  if (data) {
    const errorMessage = Object.keys(data.errors).map(
      (key) => data.errors[key]
    );

    // eslint-disable-next-line no-useless-escape
    message =
      typeof errorMessage[0] === "object"
        ? errorMessage[0][0]
        : // eslint-disable-next-line no-useless-escape
        errorMessage.join(",").replace(/\,/, ", ");
  }

  switch (status) {
    case 400:
      message = message ? message : "Verifique os dados enviados";
      break;
    case 401:
      sessionStorage.clear();
      history.replace("/");
      break;
    case 404:
      throw Error(`${method} (${status}) - Nenhum registro encontrado!`);
    case 500:
      message = message ?? "Erro no servidor";
      break;
    default:
      message = "Erro desconhecido!";
  }

  if (message) throw Error(`${method} (${status}) - ${message}`);

  return error;
}

export function handleErrorForm(method, error) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (!error?.response) error = { response: { data: false, status: false } };
  const { data, status } = error?.response;
  let message = "";

  if (data) {
    const errorMessage = Object.keys(data.errors).map(
      (key) => data.errors[key]
    );
    // eslint-disable-next-line no-useless-escape
    message =
      typeof errorMessage[0] === "object"
        ? errorMessage[0][0]
        : // eslint-disable-next-line no-useless-escape
        errorMessage.join(",").replace(/\,/, ", ");
  }

  switch (status) {
    case 400:
      message = message ?? "Verifique os dados enviados";
      break;
    case 401:
      sessionStorage.clear();
      history.replace("/");
      break;
    case 404:
      message = "Nenhum registro encontrado!";
      break;
    case 500:
      message = message ?? "Erro no servidor";
      break;
    default:
      message = "Erro desconhecido!";
      break;
  }

  if (message) return `${method} (${status}) - ${message}`;
}

export function handleParams(params, options) {
  const { skip, take, filter } = options;

  if (filter) {
    let arrayNomes = [];
    const filterResult = filter.filter((item) => item !== "and");
    const checkFilterObject =
      filterResult.length === 3 && typeof filterResult[0] === "string";

    if (checkFilterObject) {
      let field = filterResult[0];
      let value = filterResult[2];
      params[field] = value;
    } else {
      filterResult.map((item) => {
        if (!arrayNomes.includes(item[0])) {
          if (typeof item[0] === "object") {
            let field = item[0][0];
            let value = item[0][2];

            params[field] = value;
          } else {
            let field = item[0];
            let value = item[2];

            params[field] = value;
          }
          arrayNomes.push(item[0]);
        }
        return item;
      });
    }
  }

  return {
    ...params,
    skip,
    take,
  };
}

export function removeSpecialChar(data) {
  return data
    .split("(")
    .join("")
    .split(")")
    .join("")
    .split(" ")
    .join("")
    .split("-")
    .join("")
    .split(".")
    .join("")
    .split(",")
    .join("")
    .split("/")
    .join("");
}

export function filterNonNull(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v !== null));
}

export function formatDate(data) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date(data);
  const dateFormatted = date.toLocaleDateString("pt-br", options);
  return dateFormatted;
}

export function formatDateISO(data) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = new Date(data);
  const dateFormatted = date.toLocaleDateString("pt-BR", options);
  let dateIso = "";
  dateFormatted.split(" ").map((item) => {
    if (/\//gi.test(item)) {
      dateIso = `${item.split("/").reverse().join("-")}T`;
    }
    if (item.indexOf(":") !== -1) dateIso = `${dateIso}${item}Z`;
    return item;
  });
  return dateIso;
}

export function dateMask(value) {
  const data = value.toString();
  const day = data.slice(8, 10);
  const month = data.slice(5, 7);
  const year = data.slice(0, 4);
  const dataCompleta = day + "/" + month + "/" + year;
  return dataCompleta;
}

export function calculaHoras(hr1, hr2) {
  const h1 = hr1.split(':')
  let hora1 = parseInt(hoursToMinutes(h1[0])) + parseInt(h1[1])

  const h2 = hr2.split(':')
  const hora2 = parseInt(hoursToMinutes(h2[0])) + parseInt(h2[1])
  hora1 -= hora2

  return hora1
}

export function renderHora(hr) {
  var newHr = hr / 60
  const hora = Math.trunc(newHr)
  const minutos = Math.round((newHr - hora) * 60)
  if (minutos < 10) {
    return hora + ":" + 0 + minutos
  } else {
    return hora + ":" + minutos
  }
}