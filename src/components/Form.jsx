import React from 'react'
import { useForm } from 'react-hook-form'
import validator from 'validator'

const Line = () => (
  <div className="hidden sm:block" aria-hidden="true">
    <div className="py-5">
      <div className="border-t border-gray-200"></div>
    </div>
  </div>
)

const Form = () => {
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    console.log(data)
    console.error(errors)
  }

  return (
    <div className="container mx-auto pb-5">
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Datos del Notificador */}
        
        <div className="mt-5 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Datos del Notificador</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Esta sección es sólo para profesionales de la salud: médicos, químicos farmacéuticos, otros.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label htmlFor="notifier_full_name" className="block text-sm font-medium text-gray-700">Nombres y Apellidos</label>
                      <input 
                        type="text" 
                        name="notifier_full_name" 
                        id="notifier_full_name" 
                        placeholder="Ingrese su nombre completo" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.notifier_full_name && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isAlpha(value, 'es-ES', { ignore: ' ' })
                        })}
                      />
                      {
                        errors.notifier_full_name && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un nombre válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="notifier_profession" className="block text-sm font-medium text-gray-700">Profesión</label>
                      <input 
                        type="text" 
                        name="notifier_profession" 
                        id="notifier_profession" 
                        placeholder="Indique su profesión" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.notifier_profession && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isAlpha(value, 'es-ES', { ignore: ' ' })
                        })}
                      />
                      {
                        errors.notifier_profession && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese una profesión válida !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="notifier_tuition_number" className="block text-sm font-medium text-gray-700">Número de Colegiatura</label>
                      <input 
                        type="text" 
                        name="notifier_tuition_number" 
                        id="notifier_tuition_number" 
                        placeholder="Número de colegiatura" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.notifier_tuition_number && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isInt(value)
                        })}
                      />
                      {
                        errors.notifier_tuition_number && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un número de colegiatura válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="notifier_phone" className="block text-sm font-medium text-gray-700">Teléfono / Celular</label>
                      <input 
                        type="text" 
                        name="notifier_phone" 
                        id="notifier_phone" 
                        placeholder="Ingrese su número de teléfono" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.notifier_phone && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isMobilePhone(value)
                        })}
                      />
                      {
                        errors.notifier_phone && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un número de teléfono válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="notifier_email_address" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                      <input 
                        type="text" 
                        name="notifier_email_address" 
                        id="notifier_email_address" 
                        placeholder="Ingrese su correo" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.notifier_email_address && 'border-red-500 bg-red-50'}`} 
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isEmail(value)
                        })}
                      />
                      {
                        errors.notifier_email_address && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un correo válido !
                        </span>
                      }
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Datos del Paciente</h3>
                <p className="mt-1 text-sm text-gray-600">
                  En esta sección deben indicarse los datos de la persona que presenta el evento adverso.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label htmlFor="patient_full_name" className="block text-sm font-medium text-gray-700">Nombres y Apellidos <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="patient_full_name" 
                        id="patient_full_name" 
                        placeholder="Ingrese el nombre completo del paciente" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.patient_full_name && 'border-red-500 bg-red-50'}`}
                        ref={register({ 
                          required: true,
                          validate: value => validator.isEmpty(value) || validator.isAlpha(value, 'es-ES', { ignore: ' ' })
                        })}
                      />
                      {
                        errors.patient_full_name && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un nombre válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="patient_document_type" className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
                      <select 
                        name="patient_document_type" 
                        id="patient_document_type" 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ref={register}
                      >
                        <option>DNI</option>
                        <option>Pasaporte</option>
                        <option>PTP</option>
                        <option>Carné de Entranjería</option>
                      </select>
                    </div>
      
                    <div className="col-span-6 sm:col-span-2">
                      <label htmlFor="patient_document_number" className="block text-sm font-medium text-gray-700">Número de Documento</label>
                      <input 
                        type="text" 
                        name="patient_document_number" 
                        id="patient_document_number" 
                        placeholder="Indique el número de documento del paciente" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.patient_document_number && 'border-red-500 bg-red-50'}`} 
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isInt(value)
                        })}
                      />
                      {
                        errors.patient_document_number && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un número de documento válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="patient_sex" className="block text-sm font-medium text-gray-700">Sexo</label>
                      <select 
                        name="patient_sex" 
                        id="patient_sex" 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ref={register}
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                      </select>
                    </div>
      
                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="patient_age" className="block text-sm font-medium text-gray-700">Edad</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input 
                          type="text" 
                          name="patient_age" 
                          id="patient_age" 
                          placeholder="Edad del paciente" 
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${errors.patient_age && 'border-red-500 bg-red-50'}`}
                          ref={register({
                            validate: value => validator.isEmpty(value) || validator.isInt(value, { min: 1, max: 100 })
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            Años
                          </span>
                        </div>
                      </div>
                      {
                        errors.patient_age && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar una edad válida !
                        </span>
                      }
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="patient_weight" className="block text-sm font-medium text-gray-700">Peso</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input 
                          type="text" 
                          name="patient_weight" 
                          id="patient_weight" 
                          placeholder="Peso del paciente" 
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${errors.patient_weight && 'border-red-500 bg-red-50'}`}
                          ref={register({
                            validate: value => validator.isEmpty(value) || validator.isDecimal(value, { decimal_digits: '0,2' })
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            Kg
                          </span>
                        </div>
                      </div>
                      {
                        errors.patient_weight && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar un peso válido !
                        </span>
                      }
                    </div>

                    <div className="col-span-3 sm:col-span-2">
                      <label htmlFor="patient_weight" className="block text-sm font-medium text-gray-700">Estatura</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input 
                          type="text" 
                          name="patient_height" 
                          id="patient_height" 
                          placeholder="Estatura del paciente" 
                          className={`focus:ring-blue-500 focus:border-blue-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md ${errors.patient_height && 'border-red-500 bg-red-50'}`}
                          ref={register({
                            validate: value => validator.isEmpty(value) || validator.isDecimal(value, { decimal_digits: '0,2' })
                          })}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <span className="text-gray-500 sm:text-sm pr-3 font-bold">
                            cm
                          </span>
                        </div>
                      </div>
                      {
                        errors.patient_height && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Debe indicar una altura válida !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="patient_phone" className="block text-sm font-medium text-gray-700">Teléfono / Celular <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="patient_phone" 
                        id="patient_phone" 
                        placeholder="Ingrese el número de teléfono del paciente" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.patient_phone && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          required: true,
                          validate: value => validator.isEmpty(value) || validator.isMobilePhone(value)
                        })}
                      />
                      {
                        errors.patient_phone && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un número de teléfono válido !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="patient_email_address" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                      <input 
                        type="text" 
                        name="patient_email_address" 
                        id="patient_email_address" 
                        placeholder="Ingrese el correo del paciente" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.patient_email_address && 'border-red-500 bg-red-50'}`} 
                        ref={register({
                          validate: value => validator.isEmpty(value) || validator.isEmail(value)
                        })}
                      />
                      {
                        errors.patient_email_address && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese un correo válido !
                        </span>
                      }
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">Registro de Evento Adverso</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Indicar detalladamente el evento adverso.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="event_medicine" className="block text-sm font-medium text-gray-700">Medicamento <span className="text-red-500">*</span></label>
                      <select 
                        name="event_medicine" 
                        id="event_medicine" 
                        className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.event_medicine && 'border-red-500 bg-red-50'}`}
                        ref={register({
                          required: true
                        })}
                      >
                        <option value="">Seleccione</option>
                        <option value="0001">Migradin Forte</option>
                        <option value="0002">Alerfort Tab.</option>
                        <option value="0003">Dolo Rapid</option>
                        <option value="0004">Novasulf Forte</option>
                      </select>
                      {
                        errors.event_medicine && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Seleccione un medicamento !
                        </span>
                      }
                    </div>
      
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="event_medicine_batch" className="block text-sm font-medium text-gray-700">Lote del Medicamento</label>
                      <input 
                        type="text" 
                        name="event_medicine_batch" 
                        id="event_medicine_batch" 
                        placeholder="Indique el lote del medicamento" 
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        ref={register}
                      />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="event_description" className="block text-sm font-medium text-gray-700">Descripción del Evento Adverso <span className="text-red-500">*</span></label>
                      <textarea 
                        name="event_description" 
                        id="event_description" 
                        rows="5" 
                        placeholder="Describa ampliamente el evento adverso"
                        className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.event_description && 'border-red-500 bg-red-50'}`} 
                        ref={register({
                          required: true
                        })}
                      ></textarea>
                      {
                        errors.event_description && 
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          Ingrese una descripción válida !
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div className="px-4 pt-6 md:py-3 text-center md:text-right sm:px-0 md:col-span-3">
              <button 
                type="submit" 
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrar Evento
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
