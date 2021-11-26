import Swal from 'sweetalert2'

const customClass = {
  cancelButton: 'focus:outline-none transition duration-500 capitalize py-2.5 px-6 font-semibold shadow-lg rounded-full bg-red-500 hover:bg-red-400 text-white',
  confirmButton: 'focus:outline-none transition duration-500 capitalize py-2.5 px-6 font-semibold shadow-lg rounded-full bg-blue-500 hover:bg-blue-400 text-white mr-2',
  input: 'px-4 py-2 min-w-full mx-auto h-48 placeholder-gray-400 text-sm border-none text-gray-600 bg-gray-100 rounded-md resize-none transition duration-500 focus:outline-none focus:ring-2 focus:bg-white focus:shadow-lg'
}

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

export const alertQuest = (icon, text, cancelButtonText, confirmButtonText, callback) => {
  Swal.fire({
    hideClass,
    showClass,
    customClass,
    buttonsStyling: false,
    icon,
    iconColor: 'gray',
    html: text,
    showCancelButton: true,
    cancelButtonText,
    cancelButtonColor: '#EF4444',
    focusCancel: true,
    confirmButtonText,
    confirmButtonColor: '#3B82F6'
  }).then(result => {
    if (result.isConfirmed) {
      callback()
    }
  })
}

export const alertTimer = (state, icon, timer, text = 'Llene todos los campos.') => {
  if (!state) {
    let timerInterval;
    Swal.fire({
      hideClass,
      showClass,
      customClass,
      buttonsStyling: false,
      icon,
      iconColor: 'gray',
      text,
      timer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b = content.querySelector("b");
            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
    return false
  }
  return true
}

export const normalAlert = (icon, text, confirmButtonText) => {
  Swal.fire({
    hideClass,
    showClass,
    customClass,
    buttonsStyling: false,
    icon,
    iconColor: 'gray',
    html: text,
    confirmButtonText,
    confirmButtonColor: '#3B82F6'
  }).then(result => {
    if (result.isConfirmed) {
    }
  })
}

export const respAlert = async ({ cancelText = 'Cancelar', confirmText = 'Aceptar', html = 'contenido' }) => {
  const { value: text } = await Swal.fire({
    padding: '2rem',
    hideClass,
    showClass,
    customClass,
    buttonsStyling: false,
    input: 'textarea',
    html,
    title: `<h5 class="text-xl font-semibold capitalize">Pausar actividad</h5>`,
    inputPlaceholder: 'Escriba aqui...',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    inputValidator: (text) => {
      if (!text) {
        return 'No puedes guardar una pausa con una descripcion vacia.'
      }
    }
  })
  if (text) {
    return { ok: true, text }
  }
  else {
    return { ok: false }
  }
}