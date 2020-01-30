const maxHeader = '##### '

export async function wrapTextWith(cm, symbol) {
  let ranges = cm.listSelections()

  if (ranges.length > 0) {
    // TODO: Handle all selections and not just the first one
    const from = ranges[0].from()
    const to = ranges[0].to()

    // Check if string is surrounded by the symbol
    let preEndPos = {
      ch: to.ch + symbol.length,
      line: to.line,
    }
    let preText = cm.getRange(to, preEndPos)
    let postEndPos = {
      ch: from.ch - symbol.length,
      line: from.line,
    }
    let postText = cm.getRange(postEndPos, from)

    if (preText === symbol && postText === symbol) {
      // NOTES: Unexpected behaviour without await
      await cm.doc.replaceRange('', to, preEndPos)
      await cm.doc.replaceRange('', postEndPos, from)
    } else {
      await cm.doc.replaceSelection(symbol + cm.doc.getSelection() + symbol)

      // Keep selection like it was before the change
      let postEndPos = {
        ch: from.ch + symbol.length,
        line: from.line,
      }

      let preEndPos = {
        ch: to.ch + symbol.length,
        line: to.line,
      }
      cm.setSelection(postEndPos, preEndPos)
    }
  }
}
export async function insertLink(cm, isImage) {
  let ranges = cm.listSelections()
  const linkEnd = '](https://)'
  const symbol = isImage ? '![' : '['

  if (ranges.length > 0) {
    // TODO: Handle all selections and not just the first one
    const from = ranges[0].from()
    const to = ranges[0].to()

    // Check if string is surrounded by the symbol
    let preEndPos = {
      ch: to.ch + linkEnd.length,
      line: to.line,
    }
    let preText = cm.getRange(to, preEndPos)
    let postEndPos = {
      ch: from.ch - symbol.length,
      line: from.line,
    }
    let postText = cm.getRange(postEndPos, from)

    if (preText === linkEnd && postText === symbol) {
      // NOTES: Unexpected behaviour without await
      await cm.doc.replaceRange('', to, preEndPos)
      await cm.doc.replaceRange('', postEndPos, from)
    } else {
      await cm.doc.replaceSelection(symbol + cm.doc.getSelection() + linkEnd)

      // Keep selection like it was before the change
      let postEndPos = {
        ch: from.ch + symbol.length,
        line: from.line,
      }

      let preEndPos = {
        ch: to.ch + symbol.length,
        line: to.line,
      }
      cm.setSelection(postEndPos, preEndPos)
    }
  }
}

export function insertHeader(cm) {
  let cursor = cm.getCursor()
  let startOfLine = { ch: 0, line: cursor.line }
  let startOfLineText = cm.getRange(startOfLine, { ch: 1, line: cursor.line })
  // See if it is already a header
  if (startOfLineText === '#') {
    let maxHeaderCursor = {
      ch: maxHeader.length,
      line: cursor.line,
    }
    let startOfLineTextMax = cm.getRange(startOfLine, maxHeaderCursor)
    // See if reached the last possible header number
    if (startOfLineTextMax === maxHeader) {
      cm.replaceRange('', startOfLine, maxHeaderCursor)
    } else {
      cm.doc.replaceRange('#', startOfLine, startOfLine)
    }
  } else {
    // If is the first header, we add a space after #
    cm.doc.replaceRange('# ', startOfLine, startOfLine)
  }
}

export function insertOnStartOfLines(cm, symbol) {
  let cursor = cm.getCursor()
  // Create cursor position to check if symbol is already at the beginning of the line
  let prePos = {
    ch: 0,
    line: cursor.line,
  }
  let postPos = {
    ch: symbol.length,
    line: cursor.line,
  }
  // Get first characters of the line
  let postText = cm.getRange(prePos, postPos)
  if (postText === symbol) {
    cm.doc.replaceRange('', prePos, postPos)
  } else {
    cm.doc.replaceRange(
      symbol,
      { ch: 0, line: cursor.line },
      { ch: 0, line: cursor.line }
    )
  }
}
