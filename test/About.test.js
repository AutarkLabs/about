/* global artifacts, assert, before, beforeEach, context, contract, it */
const { assertRevert } = require('@aragon/test-helpers/assertThrow')

/** Helper function to import truffle contract artifacts */
const getContract = name => artifacts.require(name)

/** Helper function to read events from receipts */
const getReceipt = (receipt, event, arg) => {
  const result = receipt.logs.filter(l => l.event === event)[0].args
  return arg ? result[arg] : result
}

/** Useful constants */
const ANY_ADDR = '0xffffffffffffffffffffffffffffffffffffffff'

contract('About', accounts => {
  let APP_MANAGER_ROLE, ADD_ROLE, REMOVE_ROLE, UPDATE_ROLE
  let app, appBase, daoFact

  // setup test actor accounts
  const [root] = accounts

  before(async () => {
    // Create Base DAO and App contracts
    const kernelBase = await getContract('Kernel').new(true) // petrify immediately
    const aclBase = await getContract('ACL').new()
    const regFact = await getContract('EVMScriptRegistryFactory').new()
    daoFact = await getContract('DAOFactory').new(
      kernelBase.address,
      aclBase.address,
      regFact.address
    )

    appBase = await getContract('About').new()

    // TODO: Add Voting and DotVoting, etc to test widgets
    // votingBase = await getContract('Voting').new()
    
    // Setup ACL roles constants
    // TODO: take roles hashes from constants file
    // TODO: test roles pre-generated with keccak256
    APP_MANAGER_ROLE = await kernelBase.APP_MANAGER_ROLE()
    ADD_ROLE = await appBase.ADD_ROLE()
    REMOVE_ROLE = await appBase.REMOVE_ROLE()
    UPDATE_ROLE = await appBase.UPDATE_ROLE()
        
    /** Create the dao from the dao factory */
    const daoReceipt = await daoFact.newDAO(root)
    const dao = getContract('Kernel').at(
      getReceipt(daoReceipt, 'DeployDAO', 'dao')
    )

    /** Setup permission to install app */
    const acl = getContract('ACL').at(await dao.acl())
    await acl.createPermission(root, dao.address, APP_MANAGER_ROLE, root)

    /** Install an app instance to the dao */
    const appReceipt = await dao.newAppInstance(
      '0x1234',
      appBase.address,
      '0x',
      false
    )
    app = getContract('About').at(
      getReceipt(appReceipt, 'NewAppProxy', 'proxy')
    )

    /** Setup permissions */
    await acl.createPermission(ANY_ADDR, app.address, ADD_ROLE, root)
    await acl.createPermission(ANY_ADDR, app.address, REMOVE_ROLE, root)
    await acl.createPermission(ANY_ADDR, app.address, UPDATE_ROLE, root)

    // TODO: install other apps here

    /** Initialize app */
    await app.initialize()
  })

  context('widgets usage functions', () => {
    beforeEach(async () => {
      await app.updateWidget(0, 'something')
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
