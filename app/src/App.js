import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

import { useAragonApi } from '@aragon/api-react'
import { Main, AppBar, AppView, Button, SidePanel } from '@aragon/ui'

import PanelContent from './components/panel/PanelContent'
import Widget from './components/content/Widget'

const cards = [
  {
    content: `# Welcome to Autark
[![Autark logo](https://static.wixstatic.com/media/aa0ae4_df121a9c9e8f464a97abfbcf2f77318d~mv2.png/v1/fill/w_180,h_37,al_c,q_80,usm_0.66_1.00_0.01/autarklogo.webp)](https://www.autark.xyz)
[Visit website 🦄 🦅 🚀](https://www.autark.xyz)

Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker - autonomy, and access to tools that support the global development of complex mega - projects.

To us, complex mega - projects can mean autonomous cities, next - generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships. There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.

We will be calling this Aragon suite of project and human - coordination tools Open Enterprise, as DAOs that are solving mega - projects are the definition of an open enterprise.

In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become(or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80 % use case.

The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.
**Privacy**, **internationalization**, and **accessibility** are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.

## Our Featured Work

Here are some of our efforts.

- Projects
- Allocations
- Address Book
- Range Voting
- Rewards
- [x] Completed
- [ ] Home
- ~~something~~

We might do some other stuff someday.

## Bad things

Our markdown renderer shouldn't put these in as-is, or it would open our users to cross-site scripting (XSS) attacks.

<script>alert('omg')</script>

<img src="http://badthings.net" />

[This is a malicious link. Click it!](https://mathiasbynens.github.io/rel-noopener/malicious.html)


### And now:

\`\`\`javascript
for (var i = 0; i < items.length; i++) {
    console.log(items[i], i); // log them
}
\`\`\`

\`\`\`html
<head>
  <script>
    const myFunc = 5;
    function hello(param1) {
      doSomething()
    }
  </script>
</head>
<body>
  <h1>Hello</h1>
  <div class='hello' style="width=5px;">
    Content
  </div>
</body>
\`\`\`

## Our offerings

This is a complex nested list with images, pushing Markdown to its limits:

1. **Projects App**

   * Projects can be added by connecting a Github repo

   * Display the repo's issues within Aragon

     ![projects app showing issue detail](https://static.wixstatic.com/media/aa0ae4_dc04b485ae8644f18d9c9deaf9e3c3e3~mv2_d_2732_1760_s_2.png/v1/fill/w_1684,h_1084,al_c,q_85,usm_0.66_1.00_0.01/projects2.webp)

   * curate issues

   * prioritize a roadmap.

     There's so much to say about this. Roadmaps are essential for snackwave live-edge bespoke keffiyeh thundercats. Roof party whatever deep v glossier tumblr raw denim. Adaptogen 8-bit humblebrag heirloom helvetica craft beer bushwick pok pok iceland blue bottle quinoa. Mlkshk glossier air plant thundercats.

     YOLO viral blue bottle, slow-carb four loko occupy forage photo booth beard fanny pack pour-over subway tile. Pug jean shorts artisan, mustache locavore crucifix you probably haven't heard of them. Yuccie chartreuse normcore ennui pour-over cornhole organic prism food truck tousled godard coloring book woke. La croix fashion axe kitsch letterpress, four dollar toast chartreuse kinfolk butcher kickstarter. Tattooed pinterest cray chartreuse, plaid gochujang flexitarian literally.

   * collectively allocate bounties to multiple issues in a single action

     ![projects app displaying issues with bounties](https://static.wixstatic.com/media/aa0ae4_5ca7651a805444ad81db006b96a1f00c~mv2_d_2732_1760_s_2.png/v1/fill/w_1684,h_1084,al_c,q_85,usm_0.66_1.00_0.01/projects1.webp)

2. **Address Book**

   * maintain a list of Ethereum addresses that are mapped to human-readable names

     ![list of named addresses in Address Book](https://static.wixstatic.com/media/aa0ae4_4784da4bf9764f919afcd398345c05a1~mv2_d_2732_1760_s_2.png/v1/fill/w_1684,h_1084,al_c,q_85,usm_0.66_1.00_0.01/address1.webp)

   * can then be used in "Address" dropdown fields throughout Aragon

     0. Find somewhere that uses an address
     1. Select the dropdown
     2. Pick someone from your address book

        > creativity and hard work is driven by ambition. And ambition isn’t helped by constant affirmation. You have to almost get to a place where you’re unhappy with everything.
        >
        >> quotes in quotes in quotes
        >>> omg

   * you can add new addresses

     ![screenshot of adding a new address](https://static.wixstatic.com/media/aa0ae4_03775d51618044b1999938eab7ded51e~mv2_d_2732_1760_s_2.png/v1/fill/w_1684,h_1084,al_c,q_85,usm_0.66_1.00_0.01/address2.webp)


# Tour dates

We're going on tour! Catch us at these locations.

| When        | Where  |
|-------------|--------|
|  2019-05-30 | Paris  |
|  2019-06-01 | London |
|  2019-06-03 | Madrid |
|  2019-06-07 | Oslo   |

Would you like us to come to your city? [Get in touch](mailto:autark@autark.xyz)
`,
  },
  {
    content: `Autark is a new organization that is to be established for the purpose of advancing life on Earth, with a special focus on DAOs, Aragon, worker-autonomy, and access to tools that support the global development of complex mega-projects.
      To us, complex mega-projects can mean autonomous cities, next-generation transportation systems, solving sustainable development goals, redesigning the United Nations, or even building spaceships. There are common tools needed that will meet the primary coordination use case across all of these sectors: this can be evidenced by enterprise software companies such as Oracle and SAP building generic systems that are adopted across industries.
      We will be calling this Aragon suite of project and human-coordination tools Open Enterprise, as DAOs that are solving mega-projects are the definition of an open enterprise.
      In building Open Enterprise, we plan to also work as consultants for other decentralized organizations that intend to become (or currently are) DAOs to build custom implementations, and also determine common requirements, so we can drive the suite toward meeting the 80% use case.
      The Open Enterprise roadmap will be a continuation of the Planning Suite, with an additional focus of assessing the existing Aragon App ecosystem as a whole to develop common design patterns and components for the optimal cross-application user experience. This may require special application forks, and moving features from one app to another.
      Privacy, internationalization, and accessibility are three important pillars of our organization, and will be the pillars in which we plan to uphold the Aragon Manifesto. The Manifesto states "we are committed to a world in which every person can participate in these new organizational structures". We interpret this to mean that we need to ensure these tools can indeed be used by everyone.`,
  },
]

function App() {
  const [panelVisible, setPanelVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedWidget, seSelectedWidget] = useState(0)

  const { api } = useAragonApi()
  // const { api, appState } = useAragonApi()
  // const { count, syncing, app } = appState

  const handleClick = index => e => {
    seSelectedWidget(index)
    setPanelVisible(true)
  }

  const closePanel = () => {
    setPanelVisible(false)
  }

  const saveWidget = (ipfsAddr, index) => {
    return api.addWidget(ipfsAddr)
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
              title="Home"
              endContent={
                <div>
                  {editMode && (
                    <div>
                      <Button
                        mode="outline"
                        onClick={toggleEditMode}
                        style={{ marginRight: 20 }}
                      >
                        Cancel and Exit
                      </Button>

                      <Button mode="strong" onClick={toggleEditMode}>
                        Submit changes
                      </Button>
                    </div>
                  )}

                  {!editMode && (
                    <Button mode="strong" onClick={toggleEditMode}>
                      Edit Page
                    </Button>
                  )}
                </div>
              }
            />
          }
        >
          <WidgetsLayout>
            <Widget
              id={0}
              content={cards[0].content}
              handleClick={handleClick}
              active={editMode}
            />
            <Widget
              id={1}
              content={cards[1].content}
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
          <PanelContent
            title={cards[selectedWidget].title}
            content={cards[selectedWidget].content}
            saveWidget={saveWidget}
            closePanel={closePanel}
          />
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

// const CardContent = styled.div`
//   padding: 24px;
// `

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

// const Syncing = styled.div.attrs({children: 'Syncing…' })`
//   position: absolute;
//   top: 15px;
//   right: 20px;
// `

export default App
