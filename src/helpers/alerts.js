import Swal from 'sweetalert2'

export const alertQuest = (icon, text, cancelButtonText, confirmButtonText, callback) => {
  Swal.fire({
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