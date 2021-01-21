import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import Select from "react-select";
import axios from "axios";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import Loading from "./Loading";

const SITE_KEY = "6LcfNzMaAAAAADvYadqS9l5Qp0kb03rko1VH91f1";
const API_URL = "https://apis.corporacionnovax.com/farmacovigilancia/v0.1";

const Line = () => (
  <div className="hidden sm:block" aria-hidden="true">
    <div className="py-5">
      <div className="border-t border-gray-200"></div>
    </div>
  </div>
);

const Form = () => {
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    errors,
    watch,
  } = useForm();
  const [medicamentos, setMedicamentos] = useState([]);
  const [medicamento, setMedicamento] = useState();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [successMessage, setSuccessMessage] = useState({
    title: "Evento Registrado!",
    message:
      "Gracias por informarnos sobre el evento adverso, nos estaremos comunicando con usted muy pronto.",
  });
  const [isLoading, setIsLoading] = useState(false);

  const notificador = watch("notificador");

  useEffect(() => {
    register({ name: "id_medicamento" }, { required: true });

    axios(`${API_URL}/medicamentos`)
      .then((response) => {
        const data = [];
        response.data.map((medicamento) =>
          data.push({
            value: medicamento.id_medicamento,
            label: medicamento.nombre,
          })
        );
        setMedicamentos(data);
      })
      .catch((error) => {
        setErrorMessage({
          title: "Error",
          message:
            "Ocurrió un error al obtener la lista de medicamentos, por favor intente mas tarde!",
        });
        setOpenErrorModal(true);
      });
  }, []);

  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    // load the script by passing the URL
    loadScriptByURL(
      "recaptcha-key",
      `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`,
      function () {
        console.log("Script loaded!");
      }
    );
  }, []);

  useEffect(() => {
    if (notificador) {
      const {
        correo = "",
        nombre = "",
        numero_colegiatura = "",
        profesion = "",
        telefono = "",
      } = notificador;

      if (nombre || profesion || numero_colegiatura || telefono || correo) {
        register(
          { name: "notificador.nombre" },
          { required: true },
          {
            validate: (value) =>
              validator.isEmpty(value) ||
              validator.isAlpha(value, "es-ES", { ignore: " " }),
          }
        );
        register(
          { name: "notificador.profesion" },
          {
            validate: (value) =>
              validator.isEmpty(value) ||
              validator.isAlpha(value, "es-ES", { ignore: " " }),
          }
        );
        register(
          { name: "notificador.numero_colegiatura" },
          {
            validate: (value) =>
              validator.isEmpty(value) || validator.isInt(value),
          }
        );
        register(
          { name: "notificador.telefono" },
          { required: true },
          {
            validate: (value) =>
              validator.isEmpty(value) || validator.isMobilePhone(value),
          }
        );
        register(
          { name: "notificador.correo" },
          {
            validate: (value) =>
              validator.isEmpty(value) || validator.isEmail(value),
          }
        );
      } else {
        unregister("notificador.nombre");
        unregister("notificador.profesion");
        unregister("notificador.numero_colegiatura");
        unregister("notificador.telefono");
        unregister("notificador.correo");
      }
    }
  }, [notificador]);

  const handleMedicamentoChange = (selectedOption) => {
    setMedicamento(selectedOption);
    setValue("id_medicamento", selectedOption.value);
  };

  const onSubmit = (data) => {
    if (
      data.notificador &&
      data.notificador.correo === "" &&
      data.notificador.nombre === "" &&
      data.notificador.numero_colegiatura === "" &&
      data.notificador.profesion === "" &&
      data.notificador.telefono === ""
    ) {
      delete data.notificador;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: "submit" })
        .then((token) => {
          data.captcha = token;
          setIsLoading(true);

          axios
            .post(`${API_URL}/notificaciones/nuevo`, data)
            .then((response) => {
              setSuccessMessage({
                title: "Evento Registrado!",
                message:
                  "Gracias por informarnos sobre el evento adverso, nos estaremos comunicando con usted muy pronto.",
              });
              setOpenSuccessModal(true);
            })
            .catch((error) => {
              const message =
                error.response.data.message
                  ? error.response.data.message
                  : "Se ha generado un error al intentar registrar el evento adverso, por favor intentelo mas tarde!";

              setErrorMessage({
                title: "Error al registrar evento",
                message,
              });
              setOpenErrorModal(true);
            })
            .finally(() => setIsLoading(false));
        });
    });
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
    window.location.href = 'https://novax.com.pe';
  }

  return (
    <div className="container mx-auto pb-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Datos del Notificador */}

        <div className="mt-5 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Datos del Notificador
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Esta sección es sólo para profesionales de la salud: Médicos,
                  Químicos Farmacéuticos, otros.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="notificador.nombre"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombres y Apellidos
                      </label>
                      <input
                        type="text"
                        name="notificador.nombre"
                        id="notificador.nombre"
                        placeholder="Ingrese su nombre completo"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.notificador &&
                          errors.notificador.nombre &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isAlpha(value, "es-ES", { ignore: " " }),
                        })}
                      />
                      {errors.notificador && errors.notificador.nombre && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un nombre válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="notificador.profesion"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profesión
                      </label>
                      <input
                        type="text"
                        name="notificador.profesion"
                        id="notificador.profesion"
                        placeholder="Indique su profesión"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.notificador &&
                          errors.notificador.profesion &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isAlpha(value, "es-ES", { ignore: " " }),
                        })}
                      />
                      {errors.notificador && errors.notificador.profesion && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese una profesión válida !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="notificador.numero_colegiatura"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de Colegiatura
                      </label>
                      <input
                        type="text"
                        name="notificador.numero_colegiatura"
                        id="notificador.numero_colegiatura"
                        placeholder="Número de colegiatura"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.notificador &&
                          errors.notificador.numero_colegiatura &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) || validator.isInt(value),
                        })}
                      />
                      {errors.notificador &&
                        errors.notificador.numero_colegiatura && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            Ingrese un número de colegiatura válido !
                          </span>
                        )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="notificador.telefono"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono / Celular
                      </label>
                      <input
                        type="text"
                        name="notificador.telefono"
                        id="notificador.telefono"
                        placeholder="Ingrese su número de teléfono"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.notificador &&
                          errors.notificador.telefono &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isMobilePhone(value),
                        })}
                      />
                      {errors.notificador && errors.notificador.telefono && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un número de teléfono válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="notificador.correo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        type="text"
                        name="notificador.correo"
                        id="notificador.correo"
                        placeholder="Ingrese su correo"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.notificador &&
                          errors.notificador.correo &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isEmail(value),
                        })}
                      />
                      {errors.notificador && errors.notificador.correo && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un correo válido !
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Datos del Paciente */}

        <Line />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Datos del Paciente
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  En esta sección deben indicarse los datos de la persona que
                  presenta el evento adverso.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="paciente.nombre"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombres y Apellidos
                      </label>
                      <input
                        type="text"
                        name="paciente.nombre"
                        id="paciente.nombre"
                        placeholder="Ingrese el nombre completo del paciente"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.paciente &&
                          errors.paciente.nombre &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isAlpha(value, "es-ES", { ignore: " " }),
                        })}
                      />
                      {errors.paciente && errors.paciente.nombre && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un nombre válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="paciente.cod_tipo_documento"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tipo de Documento{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="paciente.cod_tipo_documento"
                        id="paciente.cod_tipo_documento"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ref={register({
                          required: true,
                        })}
                      >
                        <option value="DNI">DNI</option>
                        <option value="PAS">Pasaporte</option>
                        <option value="PTP">PTP</option>
                        <option value="CE">Carné de Entranjería</option>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="paciente.dni"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Número de Documento{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="paciente.dni"
                        id="paciente.dni"
                        placeholder="Indique el número de documento del paciente"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.paciente &&
                          errors.paciente.dni &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          required: true,
                          validate: (value) =>
                            validator.isEmpty(value) || validator.isInt(value),
                        })}
                      />
                      {errors.paciente && errors.paciente.dni && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un número de documento válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="paciente.cod_sexo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Sexo
                      </label>
                      <select
                        name="paciente.cod_sexo"
                        id="paciente.cod_sexo"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ref={register}
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="paciente.edad"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Edad
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="paciente.edad"
                          id="paciente.edad"
                          placeholder="Edad del paciente"
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${
                            errors.paciente &&
                            errors.paciente.edad &&
                            "border-red-500 bg-red-50"
                          }`}
                          ref={register({
                            validate: (value) =>
                              validator.isEmpty(value) ||
                              validator.isInt(value, { min: 1, max: 100 }),
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            Años
                          </span>
                        </div>
                      </div>
                      {errors.paciente && errors.paciente.edad && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar una edad válida !
                        </span>
                      )}
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="paciente.peso"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Peso
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="paciente.peso"
                          id="paciente.peso"
                          placeholder="Peso del paciente"
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${
                            errors.paciente &&
                            errors.paciente.peso &&
                            "border-red-500 bg-red-50"
                          }`}
                          ref={register({
                            validate: (value) =>
                              validator.isEmpty(value) ||
                              validator.isDecimal(value, {
                                decimal_digits: "0,2",
                              }),
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            Kg
                          </span>
                        </div>
                      </div>
                      {errors.paciente && errors.paciente.peso && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un peso válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="paciente.peso"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Estatura
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="text"
                          name="paciente.talla"
                          id="paciente.talla"
                          placeholder="Estatura del paciente"
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${
                            errors.paciente &&
                            errors.paciente.talla &&
                            "border-red-500 bg-red-50"
                          }`}
                          ref={register({
                            validate: (value) =>
                              validator.isEmpty(value) ||
                              validator.isDecimal(value, {
                                decimal_digits: "0,2",
                              }),
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            m
                          </span>
                        </div>
                      </div>
                      {errors.paciente && errors.paciente.talla && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar una altura válida !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="paciente.telefono"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono / Celular{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="paciente.telefono"
                        id="paciente.telefono"
                        placeholder="Ingrese el número de teléfono del paciente"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.paciente &&
                          errors.paciente.telefono &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          required: true,
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isMobilePhone(value),
                        })}
                      />
                      {errors.paciente && errors.paciente.telefono && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un número de teléfono válido !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="paciente.correo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Correo Electrónico
                      </label>
                      <input
                        type="text"
                        name="paciente.correo"
                        id="paciente.correo"
                        placeholder="Ingrese el correo del paciente"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.paciente &&
                          errors.paciente.correo &&
                          "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          validate: (value) =>
                            validator.isEmpty(value) ||
                            validator.isEmail(value),
                        })}
                      />
                      {errors.paciente && errors.paciente.correo && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un correo válido !
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registro del Evento Adverso */}

        <Line />

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Registro de Evento Adverso
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Indicar detalladamente el evento adverso. (Que le sucedió al
                  paciente y desde cuando presenta el evento adverso)
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="id_medicamento"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Medicamento <span className="text-red-500">*</span>
                      </label>
                      <Select
                        name="id_medicamento"
                        id="id_medicamento"
                        placeholder="Seleccione un medicamento"
                        className={`mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                          errors.id_medicamento && "border-red-500 bg-red-50"
                        }`}
                        options={medicamentos}
                        value={medicamento}
                        onChange={handleMedicamentoChange}
                      />
                      {errors.id_medicamento && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Seleccione un medicamento !
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="lote_notificacion"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lote del Medicamento
                      </label>
                      <input
                        type="text"
                        name="lote_notificacion"
                        id="lote_notificacion"
                        placeholder="Indique el lote del medicamento"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        ref={register}
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="evento"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descripción del Evento Adverso{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="evento"
                        id="evento"
                        rows="5"
                        placeholder="Describa ampliamente el evento adverso"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${
                          errors.evento && "border-red-500 bg-red-50"
                        }`}
                        ref={register({
                          required: true,
                        })}
                      ></textarea>
                      {errors.evento && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese una descripción válida !
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 pt-6 md:py-3 text-center sm:px-0 md:col-start-2 md:col-span-2">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrar Evento Adverso
              </button>
            </div>
          </div>
        </div>
      </form>
      {openErrorModal && (
        <ErrorModal msg={errorMessage} setOpenModal={setOpenErrorModal} />
      )}
      {openSuccessModal && (
        <SuccessModal msg={successMessage} handleCloseModal={handleCloseSuccessModal} />
      )}
      {
        isLoading && <Loading />
      }
    </div>
  );
};

export default Form;
