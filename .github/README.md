# Aragon About App 🦅🗣

A customizable interface to add interactive widgets with information and insights about your organization.

## Usage

### Launch a new DAO with about app installed along with Voting and Tokens apps

`npm run start:ipfs:template`

### Development

#### Run frontend development server

`npm start`

That should be enough to customize style and frontend changes, as we make use of a stubbed api to simulate some of the aragon client api

#### Run development template with hot reload and http mode

`npm run start:http:template``

This launches a DAO but uses the parcel development server ran in the previous step as the app frontend, so hot reload is still working.

Note this automatically launches `ipfs` and `devchain` daemons, so no need to launch separately, but still possible to do that.

#### For script / store development it is convenient to use the watch script

`npm run watch:script`

Works similarly to `npm start` but just keeps recompiling the background worker script related files

#### Contract development

It is needed to republish the contract locally between changes, or relaunch the app or template to handle that automatically.

### Publish

You can publish your app on [aragonPM](https://hack.aragon.org/docs/apm). See how in our [publish guide](https://hack.aragon.org/docs/guides-publish).

> **Note**\
> The [Template](https://github.com/AutarkLabs/about/blob/master/contracts/dev/Template.sol) will not be published.

Example publishing command for Autark deployments:

```sh
npm run publish:patch -- --environment rinkeby --apm.ipfs.rpc https://ipfs.autark.xyz:5001 --ipfs-check false
```

### Using a different Ethereum account

You can use a different account to interact with you app. [Check the documentation](https://hack.aragon.org/docs/guides-faq#set-a-private-key).

### Propagate content

Note this is handled automatically by `@aragon/cli` so it should not be needed

You can propagate the content of your app on IPFS. Learn more in our [troubleshooting guide](https://hack.aragon.org/docs/guides-faq#propagating-your-content-hash-through-ipfs) or use the `aragon ipfs propagate` command:

```sh
npx aragon ipfs propagate <cid>
```

Where `cid` is your content id hash (this will be displayed after publishing).
