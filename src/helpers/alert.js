import Swal from 'sweetalert2'

const showClass = {
  popup: 'animate__animated animate__bounce animate__faster',
  backdrop: 'swal2-backdrop-show',
  icon: 'swal2-icon-show'
}

const hideClass = {
  popup: 'animate__animated animate__fadeOutUp animate__faster',
  backdrop: 'swal2-backdrop-hide',
  icon: 'swal2-icon-hide'
}

const customClass = {
  cancelButton: 'focus:outline-none border-4 border-transparent focus:border-gray-400 transition duration-500 capitalize py-2.5 px-6 font-semibold shadow-xl rounded-full bg-red-500 hover:bg-red-600 text-white',
  confirmButton: 'focus:outline-none transition duration-500 capitalize py-2.5 px-6 font-semibold shadow-xl rounded-full bg-blue-500 hover:bg-blue-700 text-white mr-3',
  input: 'px-4 py-2 placeholder-gray-400 text-base border-none text-gray-600 bg-gray-100 rounded-md resize-none transition duration-500 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-lg',
  title: 'text-2xl capitalize',
  closeButton: 'focus:outline-none h-9 w-9 transition border-none duration-500 absolute -right-3 -top-3 bg-white hover:bg-red-400 text-gray-400 hover:text-white rounded-full shadow-lg',
  htmlContainer: 'text-base',
  validationMessage: '...',
}

export const Alert = async (props) => {

  let {
    type = 'alert',
    cancelText = 'cancelar',
    confirmText = 'Aceptar',
    input = 'text',
    content = 'contenido de alerta',
    title = 'titulo',
    icon = 'info',
    inputPlaceholder = 'Escriba aqui',
    showCancelButton = true,
    showConfirmButton = true,
    timer = undefined,
    action = () => { return false }
  } = props

  switch (icon) {
    case 'warn':
      icon = 'fa-exclamation-circle fa-lg text-yellow-500'
      break
    case 'info':
      icon = 'fa-exclamation-circle fa-lg text-blue-500'
      break
    case 'error':
      icon = 'fa-exclamation-circle fa-lg text-red-500'
      break
    case 'question':
      icon = 'fa-question-circle fa-lg text-blue-500'
      break
    default:
      icon = 'fa-exclamation-circle fa-lg text-blue-500'
      break
  }

  if (type === 'input') {
    const { value: text } = await Swal.fire({
      buttonsStyling: false,
      customClass,
      showClass,
      hideClass,
      input,
      html: content,
      inputPlaceholder,
      title: `<h1>${title} <i class="fas ${icon}"></i></h1>`,
      closeButtonHtml: '<i class="fas fa-times text-lg"></i>',
      showCloseButton: true,
      focusCancel: true,
      showCancelButton,
      showConfirmButton,
      cancelButtonText: cancelText,
      confirmButtonText: confirmText,
    })
    if (text) return { ok: true, text }
    else return { ok: false, text: '' }
  }

  if (type === 'alert') {
    Swal.fire({
      buttonsStyling: false,
      customClass,
      showClass,
      hideClass,
      html: content,
      title: `<h1>${title} <i class="fas ${icon}"></i></h1>`,
      closeButtonHtml: '<i class="fas fa-times text-lg"></i>',
      showCloseButton: true,
      showCancelButton,
      showConfirmButton,
      focusCancel: true,
      cancelButtonText: cancelText,
      confirmButtonText: confirmText,
      timer,
      timerProgressBar: timer !== undefined,
    }).then((result) => {
      if (result.isConfirmed) {
        action()
      }
    })
  }
}