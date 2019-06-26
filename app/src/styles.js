import styled from 'styled-components'

const SideBarScrollbarContainer = styled.div`
  height: 100%;
  position: relative;

  .react-codemirror2 {
    height: 100%;
    display: block;
    position: relative;
    cursor: text;
  }
  .CodeMirror {
    padding: 15px 30px;
    min-height: 100%;
    overflow: hidden;
  }
`

const MarkdownContainer = styled.div`
  height: 100%;
  position: relative;

  .react-codemirror2 {
    height: 100%;
    display: block;
    position: relative;
    cursor: text;
  }
  .CodeMirror {
    padding: 15px 24px;
    min-height: 100%;
    overflow: hidden;
  }
  .CodeMirror-scroll {
    overflow: auto !important;
  }
`

export { SideBarScrollbarContainer, MarkdownContainer }
