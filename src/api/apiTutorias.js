import { request } from "./request";

// export function login(datos) {
//   return request.post("users/login", datos);
// }
// export function newUser(datos) {
//   return request.post("users/registro", datos);
// }
export function getAllCarreras() {
  return request().get("carreras/obtenerCarreras");
}
/**
 *  *---------------------------------------------------------------------
 * *Rutas de informacion general del turorado y datos del alumno
 *  *---------------------------------------------------------------------
 */

export function getCuestionarioTutorado() {
  return request().get("tutorado/cuestionarioTutorado");
}
export function getAlumnoByGrupo(id) {
  return request().get(`tutorado/obtenerAlumnosPorGrupo/${id}`);
}
export function agregarInforme(data) {
  return request().post(`tutorado/agregarInforme`, data);
}
export function getAllAlumnos() {
  return request().get(`tutorado/obtenerTodosLosAlumnos`);
}
export function getDatosAlumnoPorId(id) {
  return request().get(`tutorado/obtenerAlumnosPorId/${id}`);
}
export function getDatosAlumnoPorIdConTutor(id) {
  return request().get(`tutorado/obtenerAlumnosPorIdConTutor/${id}`);
}
export function bajaDeAlumno(id) {
  return request().post(`tutorado/darBajaAlumno/${id}`);
}
export function guardarInformeGeneralDelTutorado(data) {
  return request().post("evaluaciones/agregarEvaluacion", data);
}

/**
 *  *---------------------------------------------------------------------
 * *Rutas de evaluacion del tutor
 *  *---------------------------------------------------------------------
 */

export function getCuestionarioEvaluacion() {
  return request().get("evaluaciones/cuestionarioEvaluacion");
}
export function guardarRespuesta(data) {
  return request().post("evaluaciones/agregarEvaluacion", data);
}

/**
 *  *---------------------------------------------------------------------
 * *Rutas para actividades
 *  *---------------------------------------------------------------------
 */

export function obtenerActividades() {
  return request().get(`actividades/obtenerActividades`);
}
export function obtenerActividadesPendientes() {
  return request().get(`actividades/obtenerActividadesPendientes`);
}
export function obtenerActividadesAceptadas() {
  return request().get(`actividades/obtenerActividadesAceptadas`);
}
export function obtenerActividadesRechazadas() {
  return request().get(`actividades/obtenerActividadesRechazadas`);
}
export function crearActividad(data) {
  return request().post(`actividades/agregarActividad`, data);
}
export function actualizarActividad(data) {
  return request().post(`actividades/editarActividad`, data);
}
export function aprobarActividad(data) {
  return request().post(`actividades/aceptarActividad`, data);
}
export function denegarActividad(data) {
  return request().post(`actividades/denegarActividad`, data);
}
export function deleteActividad(id) {
  return request().delete(`actividades/eliminarActividad/${id}`);
}
/**
 *  *---------------------------------------------------------------------
 * *Rutas para planeacion
 *  *---------------------------------------------------------------------
 */

export function generarPlaneacion(data, config) {
  return request().put("planeacionpdf", data, config);
}
export function generarFichaEvento(data, config) {
  return request().put("planeacion/fichaTecnica", data, config);
}

/**
 *  *---------------------------------------------------------------------
 * *Rutas para areas de apoyo
 *  *---------------------------------------------------------------------
 */

export function getAreasApoyo() {
  return request().get("apoyo/obtenerAreas");
}
export function getAreasApoyosLista() {
  return request().get("apoyo/obtenerAreasSinPersonal");
}
export function obtenerPersonalPorId(id) {
  return request().get(`apoyo/obtenerPersonalPorId/${id}`);
}
export function agregarAreaApoyo(data) {
  return request().post("apoyo/crearAreasApoyo", data);
}
export function updateArea(data) {
  return request().post(`apoyo/updateAreas`, data);
}
export function deleteArea(id) {
  return request().delete(`apoyo/eliminarAreasApoyo/${id}`);
}

/**
 *  *---------------------------------------------------------------------
 * *Rutas para maestros y asignacion de tutores
 *  *---------------------------------------------------------------------
 */

export function getMaestros() {
  return request().get("tutores/obtenerDocentes");
}
export function getTutores() {
  return request().get("tutores/obtenerTutores");
}
export function getTutoresSeleccionados() {
  return request().get("tutores/obtenerTutoresSeleccionado");
}
export function getGrupos() {
  return request().get("tutores/obtenerGrupos");
}
export function getCuatrimestres() {
  return request().get("tutores/obtenerCuatrimestres");
}
export function postAsigTutor(id) {
  return request().post("tutores/postAsignarTutor", id);
}
export function postquitTutor(id) {
  return request().post("tutores/postquitarTutor", id);
}
//! GD grupos-docentes
export function getRelacionDG() {
  return request().get("tutores/getDatos");
}
export function postRelacionGD(data) {
  return request().post("tutores/agregarAsociacion", data);
}
export function deleteRelacionGD(id) {
  return request().post(`tutores/quitarAsociacion/${id}`);
}

/**
 * *-----------------------------------------------------------
 * * RUTAS PARA PERIODOS Y CICLOS
 * *----------------------------------------------------------
 */

export function obtenerPeriodos() {
  return request().get("ciclos/obtenerPeriodos");
}
export function obtenerCiclo() {
  return request().get("ciclos/obtenerCiclos");
}
