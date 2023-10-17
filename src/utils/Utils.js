import { LocalStorage, date } from "quasar";
import alerta from "./Alerts";
import * as CryptoJS from "crypto-js";
import numeral from "numeral";

const KEY_CRYPTO = import.meta.env.VITE_KEY;
const KEY_ROUTER = import.meta.env.VITE_KEY_ROUTER;

export function encryptData(value) {
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), KEY_CRYPTO);
  return ciphertext.toString();
}

export function decryptData(value) {
  if (value === null) return value;

  let bytes = CryptoJS.AES.decrypt(value, KEY_CRYPTO);
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export function pathCrypt(_text) {
  const text = _text.toString();
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).slice(-2); //substr a slice DEPRECATE-substr
  const applySaltToChar = (code) =>
    textToChars(KEY_ROUTER).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
}

export function CheckBoxData(tipo, asignadosbd, selecteds) {
  if (tipo === "add") {
    let arrayBD = [];
    let arrayAgregar = [];
    for (let bd = 0; bd < asignadosbd.length; bd++) {
      const element = asignadosbd[bd];
      arrayBD.push(element.id);
    }
    for (let s = 0; s < selecteds.length; s++) {
      const element = selecteds[s];
      let find = arrayBD.indexOf(element.id);
      if (find === -1) {
        arrayAgregar.push(element);
      }
    }
    return arrayAgregar;
  }
  if (tipo === "delete") {
    let arraySelect = [];
    let arrayEliminar = [];
    for (let s = 0; s < selecteds.length; s++) {
      const element = selecteds[s];
      arraySelect.push(element.id);
    }
    for (let s = 0; s < asignadosbd.length; s++) {
      const element = asignadosbd[s];
      let find = arraySelect.indexOf(element.id);
      if (find === -1) {
        arrayEliminar.push(element);
      }
    }
    return arrayEliminar;
  }
}

export function pathDecrypt(_encoded) {
  const encoded = _encoded.toString();
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(KEY_ROUTER).reduce((a, b) => a ^ b, code);

  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
}

export function generateRandomString(num) {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result1 = "";
  const charactersLength = char.length;
  for (let i = 0; i < num; i++) {
    result1 += char.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result1;
}

export function hasRole(rolesPermitidos) {
  if (!Array.isArray(rolesPermitidos)) {
    alerta.sinPermisos();
    return false;
  }

  let valores = LocalStorage.getItem("roles");
  let rolesUser = decryptData(valores);
  let resultado = [];

  rolesPermitidos.forEach((rol) => {
    if (rolesUser.includes(rol)) {
      resultado.push(true);
    } else {
      resultado.push(false);
    }
  });

  let _resultado = resultado.includes(true);

  if (!_resultado) {
    alerta.sinPermisos();
  }

  return _resultado;
}

export function can(value) {
  if (typeof value !== "string") {
    return false;
  }

  let roleSession = LocalStorage.getItem("roles");
  let rolesUser = decryptData(roleSession);

  if (rolesUser.includes("Administrador")) {
    return true;
  }

  let valores = LocalStorage.getItem("permisos");
  let permisosUser = decryptData(valores);

  if (permisosUser.includes(value)) {
    console.log("SI TIENE");
    return true;
  }
  return false;
}

export function moneda(numero, type = "MXN") {
  let formato;
  switch (type) {
    case "MXN":
      formato = "$0,0.00";
      break;

    case "EUR":
      formato = "€0,0.00";
      break;

    case "USD":
      formato = "$0,0.00";
      break;
  }

  let nNumero = numeral(numero);
  let _formato = nNumero.format(formato);
  return _formato;
}

export function numerico(numero, formato = "0,0.00") {
  if (isNaN(numero)) {
    return 0;
  }
  let nNumero = numeral(numero);
  let tipo;
  if (numero - Math.floor(numero) == 0) {
    tipo = "0,0";
  } else {
    tipo = formato;
  }
  return nNumero.format(tipo);
}

export function isEmptyObject(obj) {
  let isObject = obj instanceof Object;
  if (!isObject) {
    return false;
  }
  let isEmpty = Object.entries(obj).length === 0 && obj.constructor === Object;
  return isEmpty;
}

export function rangeYears(min = 2018) {
  let max = new Date().getFullYear();
  let years = [];
  for (let i = max; i >= min; i--) {
    years.push(i);
  }
  return years;
}

export function formatDatatime(datatime) {
  if (typeof value !== "string") {
    return false;
  }
  return date.formatDate(datatime, "YYYY-MM-DDTHH:mm");
}

export async function onLineInternet() {
  let URL = import.meta.env.VITE_INTERNET_REVISION;
  let res = null;

  if (!window.navigator.onLine) {
    return false;
  }

  await fetch(URL)
    .then(() => {
      res = true;
    })
    .catch(() => {
      res = false;
    });

  return res;
}

export function switchCase(response, options, includeDefault = true) {
  if (includeDefault) {
    options["DEFAULT"] = () => alerta.error();
    return options[response] ? options[response]() : options["DEFAULT"]();
  } else {
    if (options.hasOwnProperty(response)) return options[response]();
  }
}

// función que implementa un wait con promesas
export const lazyLoad = (ms) => new Promise((r, j) => setTimeout(r, ms));

export function dowloadJson(object) {
  const string = JSON.stringify(object);
  const data = "text/json;charset=utf-8," + encodeURIComponent(string);
  const a = document.createElement("a");
  a.href = "data:" + data;
  a.download = "data.json";
  a.innerHTML = "download JSON";
  a.click();
}
