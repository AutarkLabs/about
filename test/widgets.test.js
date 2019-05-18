/* global artifacts context contract before beforeEach it assert */
const { assertRevert } = require('@aragon/test-helpers/assertThrow')
const HomePage = artifacts.require('HomePage.sol')
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
  const secondAccount = accounts[1]

  before(async () => {
    const kernelBase = await getContract('Kernel').new(true) // petrify immediately
    const aclBase = await getContract('ACL').new()
    const regFact = await EVMScriptRegistryFactory.new()
    daoFact = await DAOFactory.new(
      kernelBase.address,
      aclBase.address,
      regFact.address
    )
    appBase = await HomePage.new()

    // Setup constants
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

    app = HomePage.at(
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
  })

  it.only('debug', async () => {
    console.log(
      'hello',
      UPDATE_ROLE,
      REORDER_ROLE,
      REMOVE_ROLE,
      ADD_ROLE,
      APP_MANAGER_ROLE
    )
  })

  context('app initialization', () => {
    it('should initialize properly', async () => {
      app.initialize()
      const initBlock = await app.getInitializationBlock()
      assert.isAbove(initBlock.toNumber(), 0, 'app not initialized')
    })

    it('should initialize only once', async () => {
      app.initialize()
      assertRevert(async () => {
        app.initialize()
      })
    })
  })

  context('widgets usage', () => {
    before(async () => {
      app.initialize()
    })

    it('should be incremented by any address', async () => {
      await app.increment(1, { from: secondAccount })
      assert.equal(await app.value(), 1)
    })

    it('should not be decremented if already 0', async () => {
      app.initialize()
      return assertRevert(async () => {
        return app.decrement(1)
      })
    })

    it('should add widgets', async () => {})
  })

  context('Not authorized', async () => {})
})
