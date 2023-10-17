import { Notify, Platform } from "quasar";
const isMobile = Platform.is.mobile;
// import i18n from "src/i18n/i18n";
// const { t } = i18n.global;

const classesNotify = isMobile ? "notify-standar-movil" : "notify-standar-web";
const positionNotify = isMobile ? "top" : "bottom";
const badgePositionNotify = isMobile ? "bottom-left" : "top-left";
const timeoutNotify = isMobile ? 500 : 2000;

const actionsNotify = [
  {
    icon: "close",
    color: "red",
    round: true,
    flat: true,
    dense: true,
  },
];

Notify.setDefaults({
  timeout: timeoutNotify,
  actions: actionsNotify,
  position: positionNotify,
  classes: classesNotify,
  badgePosition: badgePositionNotify,
});

function asignados() {
  Notify.create("Se han asignado correctamente los alumnos a el tutor");
}
function actividadAceptada() {
  Notify.create({
    type: "primary",
    message: "Actividad aprobada",
  });
}

function asignado(items) {
  Notify.create({
    type: "negative",
    message: "Los alumnos " + items + " ya estan asignados a otro tutor",
    progress: true,
    classes: "glossy",
  });
}
function agregado() {
  Notify.create({
    color: "primary",
    message: "Datos agregados correctamente ",
  });
}
function cuestionarioAgregado() {
  Notify.create({
    type: "primary",
    message: "Respuesta enviada correctamente",
  });
}

function inicioSesionExitoso() {
  Notify.create({
    type: "primary",
    message: "Iniciando sesión ...",
  });
}

function actualizado() {
  Notify.create("Actualizado");
}

function eliminado() {
  Notify.create("Eliminado");
}

function error(e = "") {
  Notify.create({
    type: "negative",
    message: "Ha ocurrido un error inesperado " + e,
  });
}

function duplicados() {
  Notify.create({
    type: "warning",
    message: "Error, Este profesor ya es tutor ",
  });
}
function noTutor() {
  Notify.create({
    type: "warning",
    message: "Error, Este profesor no es un tutor",
  });
}
function tutorRelacionado() {
  Notify.create({
    type: "warning",
    message: "Error, El tutor se encuentra relacionado con un grupo",
  });
}

function tutorAgregado() {
  Notify.create({
    type: "primary",
    color: "primary",
    message: "Tutor agregado correctamente",
  });
}

function sinPermisos() {
  Notify.create("No tienes los permisos para ejecutar esta accion");
}

function sinDatos() {
  Notify.create("No se encontraron mas datos");
}

function solounFormulario() {
  Notify.create(
    "El formulario solo se puede enviar una vez, Piense bien sus respuestas antes de enviar"
  );
}

function existe() {
  Notify.create("Ya ha respondido.");
}

function camposVacios() {
  Notify.create("Trate de llenar los campos importantes");
}

function seleccioneUno() {
  Notify.create("Seleccione por lo menos un dato de la tabla");
}

function errorComa() {
  Notify.create("No deje un atributo vacio y al final no escriba la coma");
}

function existeRelacion(texto) {
  Notify.create("Existe un Dato Relacionado en " + texto);
}

function vacioSeleccion() {
  Notify.create("No ha seleccionado un registro");
}

function esPreguntaSeccion() {
  Notify.create("La Sección es una pregunta");
}

function usuarioNoExiste() {
  Notify.create({
    type: "negative",
    message: "El usuario no existe.",
  });
}

function usuarioBaja() {
  Notify.create({
    type: "negative",
    message: "El usuario esta dado de baja.",
  });
}

function errorClave() {
  Notify.create({
    type: "negative",
    message: "Error de contraseña.",
  });
}

function conectado() {
  Notify.create({
    type: "positive",
    message: "Conectado.",
  });
}

function sinConexion() {
  Notify.create({
    type: "negative",
    message: "Sin conexión.",
  });
}

function protegido() {
  Notify.create("Protegido, no se pueden hacer cambios");
}

function vacio() {
  Notify.create("La lista esta vacia");
}

function noSeleccionado() {
  Notify.create("No deje preguntas sin responder");
}

function noSalir() {
  Notify.create("Tiene que terminar todos los cuestionarios");
}

function tokenExpiro() {
  Notify.create({
    type: "negative",
    message: "El token ha expirado o ha sido eliminado.",
  });
}
function actividadAprobada() {
  Notify.create({
    color: "primary",

    message: "Actividad aprobada correctamente",
  });
}
function actividadRechazada() {
  Notify.create({
    color: "primary",
    message: "Actividad rechazada correctamente",
  });
}

export default {
  tokenExpiro,
  noSalir,
  noSeleccionado,
  asignado,
  asignados,
  actividadAceptada,
  vacioSeleccion,
  agregado,
  cuestionarioAgregado,
  inicioSesionExitoso,
  actualizado,
  eliminado,
  error,
  sinPermisos,
  existe,
  camposVacios,
  seleccioneUno,
  existeRelacion,
  conectado,
  sinConexion,
  usuarioNoExiste,
  usuarioBaja,
  errorClave,
  sinDatos,
  solounFormulario,
  errorComa,
  esPreguntaSeccion,
  duplicados,
  protegido,
  vacio,
  noTutor,
  tutorRelacionado,
  tutorAgregado,
  actividadAprobada,
  actividadRechazada,
};
