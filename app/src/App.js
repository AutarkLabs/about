import React, { useState } from 'react'
// import { useAragonApi } from '@aragon/api-react'
import { Main, AppBar, AppView, Button, Card, SidePanel, Text } from '@aragon/ui'
import styled, { css }  from 'styled-components'
import IconPencil from './shared/assets/IconPencil'
import { theme } from '@aragon/ui'
import PanelContent from './components/PanelContent'
import Preview from './components/Preview'

const cardsData = {
  left: {
    title: 'Welcome to Autark',
    content: `# Hello

## This is markdown

  - Ok
  - * Bold *
      - ** Italics ** Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker - autonomy, and access to tools that support the global development of complex mega - projects.< br > To us, complex mega - projects can mean autonomous cities, next - generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships.There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.< br > We will be calling this Aragon suite of project and human - coordination tools Open Enterprise, as DAOs that are solving mega - projects are the definition of an open enterprise.< br > In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become(or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80 % use case.<br>The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.<br>Privacy, internationalization, and accessibility are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.`,
  },
  right: {
    title: 'More text goes here',
    content:
      'Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker-autonomy, and access to tools that support the global development of complex mega-projects.<br>To us, complex mega-projects can mean autonomous cities, next-generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships. There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.<br>We will be calling this Aragon suite of project and human-coordination tools Open Enterprise, as DAOs that are solving mega-projects are the definition of an open enterprise.<br>In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become (or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80% use case.<br>The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.<br>Privacy, internationalization, and accessibility are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.',
  },
}

const Widget = ({ id, title, content, handleClick , active }) => (
  <StyledCard height="fit-content">
    <CardContent>
      <EditButton mode="text" onClick={handleClick(id)} active={active}>
        <IconPencil />
      </EditButton>
      <Text size="xxlarge" style={{display:'block',paddingBottom:'10px',paddingRight: '50px'}}>{title}</Text>
      <Preview content={content} />
    </CardContent>
  </StyledCard>
)

function App() {
  const [panelVisible, setPanelVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  // const {api, appState } = useAragonApi()
  // const {count, syncing } = appState
  const handleClick = param => e => {
    setPanelVisible(true)
  }

  const closePanel = () => {
    setPanelVisible(false)
  }


  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  return (
    <Main>
      <BaseLayout>
        <AppView
          appBar={
            <AppBar
              title="Welcome!"
              endContent={
                <Button mode={editMode?'outline':'strong'} onClick={toggleEditMode}>{editMode?'Cancel and Exit':'Edit Page'}</Button>
              }
            />
          }
        >
          <WidgetsLayout>
            <Widget
              id={0}
              title={cardsData.left.title}
              content={cardsData.left.content}
              handleClick={handleClick}
              active={editMode}
            />
            <Widget
              id={1}
              title={cardsData.right.title}
              content={cardsData.right.content}
              handleClick={handleClick}
              active={editMode}
            />
          </WidgetsLayout>
        </AppView>
      </BaseLayout>
      <SidePanel
        opened={panelVisible}
        onClose={closePanel}
        title="Content Block Editor"
      >
        <SidePanelContainer>
          <PanelContent />
        </SidePanelContainer>
      </SidePanel>
    </Main>
  )
}

const BaseLayout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

// const Count = styled.h1`
//   font-size: 30px;
// `

const WidgetsLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-auto-flow: column;
  grid-gap: 30px;
  margin-right: 30px;

  @media only screen and (max-width: 768px) {
    display: block;
    margin-right: 0;
  }
`

const CardContent = styled.div`
  padding: 24px;
`

// With this style the scrollbar on SidePanel is disabled, so we can handle it ourselves
const SidePanelContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  left: 30px;
  top: 60px;

  @media only screen and (max-height: 380px) {
    position: relative;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  margin-bottom: 30px;
  position:relative;
`

const EditButton = styled(Button)`
  position:absolute;
  right:0;
  top:0;
  opacity: 0;
  transition: opacity 0.25s;
  color:30px;
  z-index: -999;
  padding:18px;
  margin:10px;
  > svg{
    transition: fill 0.3s ease;
  }

  :hover> svg{
    fill: ${theme.accent};
  }

  ${props => props.active && css`
    opacity: 1;
    z-index: 1;
  `}
`
// const Syncing = styled.div.attrs({children: 'Syncing…' })`
//   position: absolute;
//   top: 15px;
//   right: 20px;
// `

export default App
