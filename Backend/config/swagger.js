const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Sistema Veterinaria",
      version: "1.0.0",
      description: "API para la gestión del sistema de Veterinaria."
    },
    servers: [
      {
        url: "http://localhost:5000/api/admin"
      },
      {
        url: "http://localhost:5000/api/donaciones"
      },
      {
        url: "http://localhost:5000/api/donadores"
      },
      {
        url: "http://localhost:5000/api/pacientes"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
          
        }
        
      },
      schemas: {
        Donacion: {
          type: "object",
          required: ["nombres", "apellidos", "empresa", "descripcion", "articulo", "fecha_embalaje", "direccion", "imagen"],
          properties: {
            id: { type: "integer", description: "ID de la donación" },
            nombres: { type: "string", description: "Nombre del donante" },
            apellidos: { type: "string", description: "Apellidos del donante" },
            empresa: { type: "string", description: "Empresa del donante" },
            descripcion: { type: "string", description: "Descripción del artículo donado" },
            articulo: { type: "string", description: "Artículo donado" },
            fecha_embalaje: { type: "string", format: "date", description: "Fecha de embalaje del artículo" },
            direccion: { type: "string", description: "Dirección de la donación" },
            imagen: { type: "string", description: "URL de la imagen de la donación" }
          },
          example: {
            id: 1,
            nombres: "Juan",
            apellidos: "Pérez",
            empresa: "ABC Corp",
            descripcion: "Computadora de escritorio",
            articulo: "Computadora",
            fecha_embalaje: "2025-03-15",
            direccion: "Calle Ficticia 123, Ciudad",
            imagen: "http://example.com/imagen.jpg"
          }
        },
        DonacionSinId: {
          type: "object",
          required: ["nombres", "apellidos", "empresa", "descripcion", "articulo", "fecha_embalaje", "direccion", "imagen"],
          properties: {
            nombres: { type: "string", description: "Nombre del donante" },
            apellidos: { type: "string", description: "Apellidos del donante" },
            empresa: { type: "string", description: "Empresa del donante" },
            descripcion: { type: "string", description: "Descripción del artículo donado" },
            articulo: { type: "string", description: "Artículo donado" },
            fecha_embalaje: { type: "string", format: "date", description: "Fecha de embalaje del artículo" },
            direccion: { type: "string", description: "Dirección de la donación" },
            imagen: { type: "string", description: "URL de la imagen de la donación" }
          },
          example: {
            nombres: "Juan",
            apellidos: "Pérez",
            empresa: "ABC Corp",
            descripcion: "Computadora de escritorio",
            articulo: "Computadora",
            fecha_embalaje: "2025-03-15",
            direccion: "Calle Ficticia 123, Ciudad",
            imagen: "http://example.com/imagen.jpg"
          }
        },
        Administrador: {
          type: "object",
          required: ["username", "password", "email"],
          properties: {
            id: { type: "integer", description: "ID del administrador" },
            username: { type: "string", description: "Nombre de usuario" },
            password: { type: "string", description: "Contraseña del administrador" },
            email: { type: "string", format: "email", description: "Correo electrónico" }
          },
          example: {
            id: 1,
            username: "admin123",
            password: "securepassword",
            email: "admin@example.com"
          }
        },
        AdministradorSinPassword: {
          type: "object",
          properties: {
            id: { type: "integer", description: "ID del administrador" },
            username: { type: "string", description: "Nombre de usuario" },
            email: { type: "string", format: "email", description: "Correo electrónico" }
          },
          example: {
            id: 1,
            username: "admin123",
            email: "admin@example.com"
          }
        },
        Donador: {
          type: "object",
          required: ["nombres", "apellidos", "telefono", "email", "direccion"],
          properties: {
            id: { type: "integer", description: "ID del donador" },
            nombres: { type: "string", description: "Nombre del donador" },
            apellidos: { type: "string", description: "Apellidos del donador" },
            telefono: { type: "string", description: "Teléfono del donador" },
            email: { type: "string", format: "email", description: "Correo electrónico del donador" },
            direccion: { type: "string", description: "Dirección del donador" }
          },
          example: {
            id: 1,
            nombres: "Carlos",
            apellidos: "Gómez",
            telefono: "555-1234",
            email: "carlos@example.com",
            direccion: "Avenida Siempre Viva 742"
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths: {

      "/perfil": {
        get: {
          summary: "Obtener el perfil del administrador autenticado",
          tags: ["Administradores"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Perfil del administrador obtenido con éxito",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/AdministradorSinPassword" }
                }
              }
            },
            401: { description: "No autorizado" },
            404: { description: "Administrador no encontrado" },
            500: { description: "Error en el servidor" }
          }
        }
      },
      "/admin": {
        get: {
          summary: "Obtener lista de administradores",
          tags: ["Administradores"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Lista de administradores obtenida con éxito",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/AdministradorSinPassword" }
                  }
                }
              }
            },
            401: { description: "No autorizado" },
            500: { description: "Error en el servidor" }
          }
        },
        post: {
          summary: "Crear un nuevo administrador",
          tags: ["Administradores"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Administrador" }
              }
            }
          },
          responses: {
            201: { description: "Administrador creado con éxito" },
            400: { description: "Datos inválidos" },
            401: { description: "No autorizado" },
            500: { description: "Error en el servidor" }
          }
        }
      },
      "/admin/{id}": {
        put: {
          summary: "Editar un administrador existente",
          tags: ["Administradores"],
          security: [{ bearerAuth: [] }],
          parameters: [{
            in: "path",
            name: "id",
            required: true,
            description: "ID del administrador a actualizar",
            schema: { type: "integer" }
          }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Administrador" }
              }
            }
          },
          responses: {
            200: { description: "Administrador actualizado con éxito" },
            400: { description: "Datos inválidos" },
            401: { description: "No autorizado" },
            404: { description: "Administrador no encontrado" },
            500: { description: "Error en el servidor" }
          }
        },
        delete: {
          summary: "Eliminar un administrador",
          tags: ["Administradores"],
          security: [{ bearerAuth: [] }],
          parameters: [{
            in: "path",
            name: "id",
            required: true,
            description: "ID del administrador a eliminar",
            schema: { type: "integer" }
          }],
          responses: {
            200: { description: "Administrador eliminado con éxito" },
            401: { description: "No autorizado" },
            404: { description: "Administrador no encontrado" },
            500: { description: "Error en el servidor" }
          }
        }
      },
      "/donaciones": {
        get: {
          summary: "Obtener todas las donaciones",
          tags: ["Donaciones"],
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Lista de donaciones obtenida con éxito",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Donacion" }
                  }
                }
              }
            },
            401: { description: "No autorizado" },
            500: { description: "Error en el servidor" }
          }
        },
        post: {
          summary: "Crear una nueva donación",
          tags: ["Donaciones"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DonacionSinId" }
              }
            }
          },
          responses: {
            201: { description: "Donación creada con éxito" },
            400: { description: "Datos inválidos" },
            401: { description: "No autorizado" },
            500: { description: "Error en el servidor" }
          }
        }
      },
      "/donaciones/{id}": {
        put: {
          summary: "Editar una donación existente",
          tags: ["Donaciones"],
          security: [{ bearerAuth: [] }],
          parameters: [{
            in: "path",
            name: "id",
            required: true,
            description: "ID de la donación a actualizar",
            schema: { type: "integer" }
          }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/DonacionSinId" }
              }
            }
          },
          responses: {
            200: { description: "Donación actualizada con éxito" },
            400: { description: "Datos inválidos" },
            401: { description: "No autorizado" },
            404: { description: "Donación no encontrada" },
            500: { description: "Error en el servidor" }
          }
        },
        delete: {
          summary: "Eliminar una donación",
          tags: ["Donaciones"],
          security: [{ bearerAuth: [] }],
          parameters: [{
            in: "path",
            name: "id",
            required: true,
            description: "ID de la donación a eliminar",
            schema: { type: "integer" }
          }],
          responses: {
            200: { description: "Donación eliminada con éxito" },
            401: { description: "No autorizado" },
            404: { description: "Donación no encontrada" },
            500: { description: "Error en el servidor" }
          }
        }
         },
        
         "/donadores": {
          get: {
            summary: "Obtener todos los donadores",
            description: "Devuelve una lista de todos los donadores registrados.",
            tags: ["Donadores"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            responses: {
              200: {
                description: "Lista de donadores obtenida correctamente",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 1 },
                          nombre: { type: "string", example: "Juan" },
                          apellido: { type: "string", example: "Pérez" },
                          telefono: { type: "string", example: "555-1234" },
                          email: { type: "string", example: "juan@example.com" },
                          direccion: { type: "string", example: "Calle 123" },
                          fecha_registro: {
                            type: "string",
                            format: "date-time",
                            example: "2024-03-15T12:00:00Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
              500: {
                description: "Error en el servidor",
              },
            },
          },
          post: {
            summary: "Crear un nuevo donante",
            description: "Registra un nuevo donante en el sistema.",
            tags: ["Donadores"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nombre: { type: "string", example: "Ana" },
                      apellido: { type: "string", example: "López" },
                      telefono: { type: "string", example: "555-5678" },
                      email: { type: "string", example: "ana@example.com" },
                      direccion: { type: "string", example: "Avenida Principal 456" },
                    },
                    required: ["nombre", "apellido", "telefono", "email", "direccion"],
                  },
                },
              },
            },
            responses: {
              201: {
                description: "Donante creado con éxito",
              },
              400: {
                description: "Todos los campos son obligatorios",
              },
              500: {
                description: "Error en el servidor",
              },
            },
          },
        },
        "/donadores/{id}": {
          put: {
            summary: "Editar un donante",
            description: "Actualiza los datos de un donante existente.",
            tags: ["Donadores"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "ID del donante a actualizar",
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      nombre: { type: "string", example: "Carlos" },
                      apellido: { type: "string", example: "Ramírez" },
                      telefono: { type: "string", example: "555-9876" },
                      email: { type: "string", example: "carlos@example.com" },
                      direccion: { type: "string", example: "Calle Secundaria 789" },
                    },
                    required: ["nombre", "apellido", "telefono", "email", "direccion"],
                  },
                },
              },
            },
            responses: {
              200: {
                description: "Donante actualizado con éxito",
              },
              400: {
                description: "Todos los campos son obligatorios",
              },
              404: {
                description: "Donante no encontrado",
              },
              500: {
                description: "Error en el servidor",
              },
            },
          },
          delete: {
            summary: "Eliminar un donante",
            description: "Elimina un donante del sistema.",
            tags: ["Donadores"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "ID del donante a eliminar",
              },
            ],
            responses: {
              200: {
                description: "Donante eliminado con éxito",
              },
              404: {
                description: "Donante no encontrado",
              },
              500: {
                description: "Error en el servidor",
            }
          }
         }

        }
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: { persistAuthorization: true }
  }));
};

module.exports = setupSwagger;


