/**
 * Runs `fn` once the page has finished loading and the main thread is idle, so
 * work that is not needed for the first paint (the 3D hero, measurement scripts)
 * never competes with it. Browser only. Returns a function that cancels the wait.
 * `timeout` stops a busy page from postponing `fn` for ever; Safari has no
 * `requestIdleCallback`, so there it falls back to a short timer.
 */
export function afterLoadAndIdle(fn: () => void, timeout = 2500): () => void {
  let handle = 0
  let idle = false
  let cancelled = false
  const run = () => {
    if (cancelled) return
    if (typeof window.requestIdleCallback === 'function') {
      idle = true
      handle = window.requestIdleCallback(fn, { timeout })
    } else handle = window.setTimeout(fn, 300)
  }
  if (document.readyState === 'complete') run()
  else window.addEventListener('load', run, { once: true })
  return () => {
    cancelled = true
    window.removeEventListener('load', run)
    if (idle) window.cancelIdleCallback(handle)
    else window.clearTimeout(handle)
  }
}
