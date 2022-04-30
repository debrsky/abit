export function createElement (html) {
  const elem = document.createElement('div');
  elem.insertAdjacentHTML('afterbegin', html);
  return elem.firstElementChild;
}

export function throttle(callee, timeout) {
  let timer = null

  return function perform(...args) {
    if (timer) return

    timer = setTimeout(() => {
      callee(...args)

      clearTimeout(timer)
      timer = null
    }, timeout)
  }
}
