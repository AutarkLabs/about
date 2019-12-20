import styled from 'styled-components'

const SideBarScrollbarContainer = styled.div`
  height: 100%;
  position: relative;
`

const MarkdownContainer = styled.div`
  height: 100%;
  position: relative;

  .react-codemirror2 {
    height: auto;
    display: block;
    position: relative;
    cursor: text;
  }
`

export { SideBarScrollbarContainer, MarkdownContainer }
