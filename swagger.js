const swaggerDocument = {
    openapi: '3.0.3',
    info: {
        title: 'API Hospital',
        version: '1.0.0',
        description: 'API para consultar y administrar medicamentos y doctores del hospital.'
    },
    servers: [
        {
            url: 'https://hospital-api-tcp5.onrender.com/',
            description: 'Servidor en linea'
        }
    ],
    tags: [
        { name: 'General', description: 'Estado y bienvenida de la API' },
        { name: 'Medicamentos', description: 'Operaciones sobre medicamentos' },
        { name: 'Doctores', description: 'Operaciones sobre doctores' }
    ],
    paths: {
        '/': {
            get: {
                tags: ['General'],
                summary: 'Obtener mensaje de bienvenida',
                responses: {
                    200: {
                        description: 'Mensaje de bienvenida',
                        content: {
                            'text/html': {
                                schema: { type: 'string', example: 'Bienvenido a la api' }
                            }
                        }
                    }
                }
            }
        },
        '/medicamentos': {
            get: {
                tags: ['Medicamentos'],
                summary: 'Listar medicamentos',
                responses: {
                    200: {
                        description: 'Lista de medicamentos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Medicamento' }
                                }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/ErrorConsultaMedicamentos' }
                }
            },
            post: {
                tags: ['Medicamentos'],
                summary: 'Registrar un medicamento',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/MedicamentoInput' }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Medicamento registrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/MedicamentoCreado' }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/Error' }
                }
            }
        },
        '/medicamentos/{id}': {
            get: {
                tags: ['Medicamentos'],
                summary: 'Consultar un medicamento por ID',
                parameters: [{ $ref: '#/components/parameters/IdMedicamento' }],
                responses: {
                    200: {
                        description: 'Resultado de la consulta del medicamento',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/MedicamentoEncontrado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoMedicamento' },
                    404: { $ref: '#/components/responses/MedicamentoNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            },
            put: {
                tags: ['Medicamentos'],
                summary: 'Actualizar un medicamento',
                parameters: [{ $ref: '#/components/parameters/IdMedicamento' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/MedicamentoInput' }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Medicamento modificado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/MedicamentoActualizado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoMedicamento' },
                    404: { $ref: '#/components/responses/MedicamentoNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            },
            delete: {
                tags: ['Medicamentos'],
                summary: 'Eliminar un medicamento',
                parameters: [{ $ref: '#/components/parameters/IdMedicamento' }],
                responses: {
                    200: {
                        description: 'Medicamento eliminado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/MedicamentoEliminado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoMedicamento' },
                    404: { $ref: '#/components/responses/MedicamentoNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            }
        },
        '/doctores': {
            get: {
                tags: ['Doctores'],
                summary: 'Listar doctores',
                responses: {
                    200: {
                        description: 'Lista de doctores',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Doctor' }
                                }
                            }
                        }
                    },
                    500: {
                        description: 'Error al consultar doctores',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                                example: { error: 'Error al consultar los medicamentos' }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Doctores'],
                summary: 'Registrar un doctor',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/DoctorInput' }
                        }
                    }
                },
                responses: {
                    201: {
                        description: 'Doctor registrado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/DoctorCreado' }
                            }
                        }
                    },
                    500: { $ref: '#/components/responses/Error' }
                }
            }
        },
        '/doctores/{id}': {
            get: {
                tags: ['Doctores'],
                summary: 'Consultar un doctor por ID',
                parameters: [{ $ref: '#/components/parameters/IdDoctor' }],
                responses: {
                    200: {
                        description: 'Resultado de la consulta del doctor',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/DoctorEncontrado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoDoctor' },
                    404: { $ref: '#/components/responses/DoctorNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            },
            put: {
                tags: ['Doctores'],
                summary: 'Actualizar un doctor',
                parameters: [{ $ref: '#/components/parameters/IdDoctor' }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/DoctorInput' }
                        }
                    }
                },
                responses: {
                    200: {
                        description: 'Doctor actualizado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/DoctorActualizado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoDoctor' },
                    404: { $ref: '#/components/responses/DoctorNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            },
            delete: {
                tags: ['Doctores'],
                summary: 'Eliminar un doctor',
                parameters: [{ $ref: '#/components/parameters/IdDoctor' }],
                responses: {
                    200: {
                        description: 'Doctor eliminado',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/DoctorEliminado' }
                            }
                        }
                    },
                    400: { $ref: '#/components/responses/IdInvalidoDoctor' },
                    404: { $ref: '#/components/responses/DoctorNoEncontrado' },
                    500: { $ref: '#/components/responses/Error' }
                }
            }
        }
    },
    components: {
        parameters: {
            IdMedicamento: {
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID entero positivo del medicamento',
                schema: { type: 'integer', minimum: 1 }
            },
            IdDoctor: {
                name: 'id',
                in: 'path',
                required: true,
                description: 'ID entero positivo del doctor',
                schema: { type: 'integer', minimum: 1 }
            }
        },
        schemas: {
            Medicamento: {
                type: 'object',
                properties: {
                    id_medicamento: { type: 'integer', example: 1 },
                    nombre: { type: 'string', example: 'Paracetamol' },
                    laboratorio: { type: 'string', example: 'Genomma Lab' },
                    categoria: { type: 'string', example: 'Analgesico' },
                    precio: { type: 'number', format: 'float', example: 85.5 },
                    stock: { type: 'integer', example: 90 },
                    presentacion: { type: 'string', example: 'Tabletas' },
                    fecha_caducidad: { type: 'string', format: 'date', example: '2027-05-15' },
                    proveedor: { type: 'string', example: 'Farmaceutica Nacional' },
                    ubicacion: { type: 'string', example: 'Pachuca de Soto' }
                }
            },
            MedicamentoInput: {
                type: 'object',
                properties: {
                    nombre: { type: 'string', example: 'Paracetamol' },
                    laboratorio: { type: 'string', example: 'Genomma Lab' },
                    categoria: { type: 'string', example: 'Analgesico' },
                    precio: { type: 'number', format: 'float', example: 85.5 },
                    stock: { type: 'integer', example: 90 },
                    presentacion: { type: 'string', example: 'Tabletas' },
                    fecha_caducidad: { type: 'string', format: 'date', example: '2027-05-15' },
                    proveedor: { type: 'string', example: 'Farmaceutica Nacional' },
                    ubicacion: { type: 'string', example: 'Pachuca de Soto' }
                }
            },
            Doctor: {
                type: 'object',
                properties: {
                    id_doctor: { type: 'integer', example: 1 },
                    nombre: { type: 'string', example: 'Patricio' },
                    apellido_paterno: { type: 'string', example: 'Hernandez' },
                    apellido_materno: { type: 'string', example: 'Lopez' },
                    especialidad: { type: 'string', example: 'Cardiologia' },
                    consultorio: { type: 'string', example: '101' },
                    telefono: { type: 'string', example: '7711234567' },
                    correo: { type: 'string', format: 'email', example: 'doctor@hospital.com' },
                    fecha_ingreso: { type: 'string', format: 'date', example: '2022-03-15' },
                    turno: { type: 'string', example: 'Matutino' }
                }
            },
            DoctorInput: {
                type: 'object',
                properties: {
                    nombre: { type: 'string', example: 'Patricio' },
                    apellido_paterno: { type: 'string', example: 'Hernandez' },
                    apellido_materno: { type: 'string', example: 'Lopez' },
                    especialidad: { type: 'string', example: 'Cardiologia' },
                    consultorio: { type: 'string', example: '101' },
                    telefono: { type: 'string', example: '7711234567' },
                    correo: { type: 'string', format: 'email', example: 'doctor@hospital.com' },
                    fecha_ingreso: { type: 'string', format: 'date', example: '2022-03-15' },
                    turno: { type: 'string', example: 'Matutino' }
                }
            },
            MedicamentoCreado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Medicamento registrado' },
                    id_medicamento: { type: 'integer', example: 12 }
                }
            },
            DoctorCreado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Doctor registrado' },
                    id_doctor: { type: 'integer', example: 12 }
                }
            },
            MedicamentoActualizado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Medicamento modificado' },
                    id_medicamento: { type: 'integer', example: 12 }
                }
            },
            DoctorActualizado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Doctor actualizado' },
                    id_doctor: { type: 'integer', example: 12 }
                }
            },
            MedicamentoEliminado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Medicamento eliminado' },
                    id_medicamento: { type: 'integer', example: 12 }
                }
            },
            MedicamentoEncontrado: {
                type: 'object',
                properties: {
                    result: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Medicamento' }
                    }
                }
            },
            DoctorEliminado: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Doctor eliminado' },
                    id_doctor: { type: 'integer', example: 12 }
                }
            },
            DoctorEncontrado: {
                type: 'object',
                properties: {
                    result: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Doctor' }
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string', example: 'Error al procesar la solicitud' }
                }
            }
        },
        responses: {
            Error: {
                description: 'Error en la solicitud o en la base de datos',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' }
                    }
                }
            },
            ErrorConsultaMedicamentos: {
                description: 'Error al consultar los medicamentos',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: { error: 'Error al consultar los medicamentos' }
                    }
                }
            },
            IdInvalidoMedicamento: {
                description: 'El ID debe ser un entero positivo',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: { error: 'El ID del medicamento debe ser un entero positivo' }
                    }
                }
            },
            IdInvalidoDoctor: {
                description: 'El ID debe ser un entero positivo',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: { error: 'El ID del Doctor debe ser un entero positivo' }
                    }
                }
            },
            MedicamentoNoEncontrado: {
                description: 'No se encontró el medicamento',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: { error: 'No se encontró el medicamento' }
                    }
                }
            },
            DoctorNoEncontrado: {
                description: 'No se encontró el doctor',
                content: {
                    'application/json': {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: { error: 'No se encontró el doctor' }
                    }
                }
            }
        }
    }
};

export default swaggerDocument;
