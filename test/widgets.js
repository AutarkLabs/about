/* global artifacts context contract before beforeEach it assert */
const { assertRevert } = require('@aragon/test-helpers/assertThrow')
const About = artifacts.require('About')
const DAOFactory = artifacts.require(
  '@aragon/core/contracts/factory/DAOFactory'
)
const EVMScriptRegistryFactory = artifacts.require(
  '@aragon/core/contracts/factory/EVMScriptRegistryFactory'
)
const ACL = artifacts.require('@aragon/core/contracts/acl/ACL')
const Kernel = artifacts.require('@aragon/core/contracts/kernel/Kernel')
const getContract = name => artifacts.require(name)
const ANY_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffff'

contract('Widgets', accounts => {
  let APP_MANAGER_ROLE, ADD_ROLE, REMOVE_ROLE, REORDER_ROLE, UPDATE_ROLE
  let daoFact, appBase, app

  const firstAccount = accounts[0]

  before(async () => {
    const kernelBase = await getContract('Kernel').new(true) // petrify immediately
    const aclBase = await getContract('ACL').new()
    const regFact = await EVMScriptRegistryFactory.new()
    daoFact = await DAOFactory.new(
      kernelBase.address,
      aclBase.address,
      regFact.address
    )
    appBase = await About.new()

    // Setup constants
    // TODO: take roles hashes from constants file
    // TODO: test roles pre-generated with keccak256
    APP_MANAGER_ROLE = await kernelBase.APP_MANAGER_ROLE()
    ADD_ROLE = await appBase.ADD_ROLE()
    REMOVE_ROLE = await appBase.REMOVE_ROLE()
    REORDER_ROLE = await appBase.REORDER_ROLE()
    UPDATE_ROLE = await appBase.UPDATE_ROLE()
  })

  beforeEach(async () => {
    const daoReceipt = await daoFact.newDAO(firstAccount)
    const dao = Kernel.at(
      daoReceipt.logs.filter(l => l.event === 'DeployDAO')[0].args.dao
    )
    const acl = ACL.at(await dao.acl())

    await acl.createPermission(
      firstAccount,
      dao.address,
      APP_MANAGER_ROLE,
      firstAccount,
      {
        from: firstAccount,
      }
    )

    const receipt = await dao.newAppInstance(
      '0x1234',
      appBase.address,
      '0x',
      false,
      { from: firstAccount }
    )

    app = About.at(
      receipt.logs.filter(l => l.event === 'NewAppProxy')[0].args.proxy
    )

    await acl.createPermission(
      ANY_ADDRESS,
      app.address,
      ADD_ROLE,
      firstAccount,
      {
        from: firstAccount,
      }
    )
    await acl.createPermission(
      ANY_ADDRESS,
      app.address,
      REMOVE_ROLE,
      firstAccount,
      {
        from: firstAccount,
      }
    )

    await acl.createPermission(
      ANY_ADDRESS,
      app.address,
      REORDER_ROLE,
      firstAccount,
      {
        from: firstAccount,
      }
    )

    await acl.createPermission(
      ANY_ADDRESS,
      app.address,
      UPDATE_ROLE,
      firstAccount,
      {
        from: firstAccount,
      }
    )
    app.initialize()
  })

  context('widgets usage functions', () => {
    let widgetAddedReceipt = []

    beforeEach(async () => {
      widgetAddedReceipt = await app.updateWidget(0, 'something')
    })

    it('should update a widget', async () => {
      const widgetUpdatedReceipt = await app.updateWidget(0, 'something else')
      const event = widgetUpdatedReceipt.logs.filter(
        l => l.event === 'WidgetUpdated'
      )
      assert.equal(event.length, 1, 'widget not updated correctly')
    })

    it('should get a widget', async () => {
      const widget = await app.getWidget(0)
      assert.equal(widget[0], 'something', 'widgets string invalid')
      assert.equal(widget[1], 0, 'widgets priority invalid')
    })
  })

  // TODO: context('not authorized', async () => {})

  context('app initialization', () => {
    it('should initialize properly', async () => {
      const initBlock = await app.getInitializationBlock()
      assert.isAbove(initBlock.toNumber(), 0, 'app not initialized')
    })

    // TODO: Check why every test put after this fails with a revert
    it('should initialize only once', async () => {
      assertRevert(async () => {
        app.initialize()
      })
    })
  })
})
