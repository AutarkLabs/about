import dragTracker from 'drag-tracker'

/* Inlined resize handle CSS */
document.documentElement.firstElementChild // <head>, or <body> if there is no <head>
  .appendChild(document.createElement('style')).textContent =
  '## PLACEHOLDER-CSS ##'

function cmResize(cm, config) {
  config = config || {}

  const minW = config.minWidth || 200
  const minH = config.minHeight || 100
  const resizeW = config.resizableWidth !== false
  const resizeH = config.resizableHeight !== false
  const css = config.cssClass || 'cm-resize-handle'

  const cmElement = cm.display.wrapper
  const cmHandle =
    config.handle ||
    (function() {
      const h = cmElement.appendChild(document.createElement('div'))
      h.className = css
      return h
    })()

  // We need to leave room for our default handle when only one scrollbar is visible.
  // The UI should be built by now: https://github.com/codemirror/CodeMirror/issues/798
  const vScroll = cmElement.querySelector('.CodeMirror-overlayscroll-vertical')
  const hScroll = cmElement.querySelector(
    '.CodeMirror-overlayscroll-horizontal'
  )
  function constrainScrollbars() {
    if (!config.handle) {
      vScroll.style.bottom = '18px'
      hScroll.style.right = '18px'
    }
  }
  // Catches all cases where scrollbars may (re)appear: Resizer dragging, editing and screen resizing:
  cm.on('update', constrainScrollbars)
  // Needed if scrollbars are present from the start:
  constrainScrollbars()

  let startPos, startSize
  dragTracker({
    // Might be a different parent container if we were given a custom handler element..
    //  container: cmElement,
    container: cmHandle.offsetParent,
    selector: cmHandle,

    callbackDragStart: (handle, pos) => {
      startPos = pos
      startSize = [cmElement.clientWidth, cmElement.clientHeight]
    },
    callback: (handle, pos) => {
      const diffX = pos[0] - startPos[0]
      const diffY = pos[1] - startPos[1]
      const cw = resizeW ? Math.max(minW, startSize[0] + diffX) : null
      const ch = resizeH ? Math.max(minH, startSize[1] + diffY) : null

      cm.setSize(cw, ch)
      // Handled by CM's 'update' event above..
      //  constrainScrollbars();
    },
  })

  return cmHandle
}

export default cmResize
