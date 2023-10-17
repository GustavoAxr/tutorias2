const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/tutorias",
    component: () => import("src/layouts/MainLayout.vue"),
    redirect: "tutorias/inicio",
    children: [
      {
        path: "inicio",
        name: "inicio",
        component: () => import("src/pages/IndexPage.vue"),
      },
      {
        path: "profesores",
        name: "profesores",
        component: () => import("src/pages/ProfesoresPage.vue"),
      },
      {
        path: "alumnos",
        name: "alumnos",
        component: () => import("src/pages/AlumnosPage.vue"),
      },
      {
        path: "F-SA-01",
        name: "F-SA-01",
        component: () => import("src/pages/encuestas/FSA01Page.vue"),
      },
      {
        path: "F-SA-27",
        name: "F-SA-27",
        component: () => import("src/pages/encuestas/FSA27Page.vue"),
      },
      {
        path: "conf",
        name: "conf",
        component: () => import("src/pages/SettingsPage.vue"),
      },
      {
        path: "activities",
        name: "activities",
        component: () => import("src/pages/ActivitiesPage.vue"),
      },
      {
        path: "apoyo",
        name: "apoyo",
        component: () => import("src/pages/ApoyoPage.vue"),
      },
      {
        path: "aprobacion",
        name: "aprobacion",
        component: () => import("src/pages/AprobarActividades.vue"),
      },
      {
        path: "ciclos",
        name: "ciclos",
        component: () => import("src/pages/AdministrarCiclos.vue"),
      },
      {
        path: "acercaDe",
        name: "acercaDe",
        component: () => import("src/pages/AcercaDe.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
