import React from 'react'
import styled from 'styled-components'

import { TabBar } from '@aragon/ui'

const EditorTabBar = ({ screenIndex, handleChange }) => (
  <TabBarWrapper>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '20px',
      }}
    >
      <TabBar
        items={['Write', 'Preview']}
        selected={screenIndex}
        onChange={handleChange}
      />
      Edit ToolBar
    </div>
  </TabBarWrapper>
)

const TabBarWrapper = styled.div`
  margin: 0 -30px 30px;
`

export default EditorTabBar
