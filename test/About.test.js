/* global artifacts, assert, before, context, contract, it */
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
  let APP_MANAGER_ROLE, UPDATE_CONTENT
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
    UPDATE_CONTENT = await appBase.UPDATE_CONTENT()

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
    await acl.createPermission(ANY_ADDR, app.address, UPDATE_CONTENT, root)

    // TODO: install other apps here

    /** Initialize app */
    await app.initialize()
  })

  context('widgets usage functions', () => {
    it('should get the right content', async () => {
      const cid = 'bafyreicnzfnootz5mokajmf2mhb3mudvfxbkd57c2yarjejsv77toh7t7m'
      await app.updateContent(cid)
      const content = await app.content()
      assert.equal(content, cid)
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
