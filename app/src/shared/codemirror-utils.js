const maxHeader = '##### '

export async function wrapTextWith(cm, symbol) {
  let ranges = cm.listSelections()

  if (ranges.length > 0) {
    // TODO: Handle all selections and not just the first one
    const from = ranges[0].from()
    const to = ranges[0].to()

    // Check if string is surrounded by the symbol
    let preEndPos = {
      line: to.line,
      ch: to.ch + symbol.length,
    }
    let preText = cm.getRange(to, preEndPos)
    let postEndPos = {
      line: from.line,
      ch: from.ch - symbol.length,
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
        line: from.line,
        ch: from.ch + symbol.length,
      }

      let preEndPos = {
        line: to.line,
        ch: to.ch + symbol.length,
      }
      cm.setSelection(postEndPos, preEndPos)
    }
  }
}

export async function insertLink(cm, isImage) {
  let cursor = cm.getCursor()
  let ranges = cm.listSelections()
  const linkEnd = '](https://)'
  const symbol = isImage ? '![' : '['

  if (ranges.length > 0) {
    // TODO: Handle all selections and not just the first one
    let range = ranges[0]
    if (!range.empty()) {
      const from = range.from()
      const to = range.to()
      let selection = cm.getRange(from, to)
      selection = symbol + selection + linkEnd
      await cm.doc.replaceRange(selection, from, to)
      cm.doc.setSelection(to, from)

      // Keep selection like it was before the change
      let postEndPos = {
        line: from.line,
        ch: from.ch + symbol.length,
      }

      let preEndPos = {
        line: to.line,
        ch: to.ch + symbol.length,
      }
      cm.setSelection(postEndPos, preEndPos)
    } else {
      // Without a selection, we must rely on cursor position
      await cm.doc.replaceRange(symbol + linkEnd, cursor, cursor)
      cm.setCursor({
        line: cursor.line,
        ch: cursor.ch + 1,
      })
    }
  }
}

export function insertHeader(cm) {
  let cursor = cm.getCursor()
  let startOfLine = { line: cursor.line, ch: 0 }
  let startOfLineText = cm.getRange(startOfLine, { line: cursor.line, ch: 1 })
  // See if it is already a header
  if (startOfLineText === '#') {
    let maxHeaderCursor = {
      line: cursor.line,
      ch: maxHeader.length,
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
  // Create cursor position to check if symbol is already at the begining of the line
  let prePos = {
    line: cursor.line,
    ch: 0,
  }
  let postPos = {
    line: cursor.line,
    ch: symbol.length,
  }
  // Get first characters of the line
  let postText = cm.getRange(prePos, postPos)
  if (postText === symbol) {
    cm.doc.replaceRange('', prePos, postPos)
  } else {
    cm.doc.replaceRange(
      symbol,
      { line: cursor.line, ch: 0 },
      { line: cursor.line, ch: 0 }
    )
  }
}
