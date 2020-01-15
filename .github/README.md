# Aragon About App 🦅🗣

A new about page for Aragon DAO´s

## Usage

### Launch the custom client with about support

1. Clone Aragon about, run a devchain and publish `about` to this devchain

   ```sh
   git clone https://github.com/AutarkLabs/about.git
   cd about
   npm i # install dependencies
   npx aragon ipfs # run ipfs local node
   npx aragon devchain # run local ganache-cli devchain
                           # add "--reset" to delete previous chain data
   ```

2. Open another terminal and go again into the folder `cd about`

   ```sh
   npm run publish:major -- --environment default
   cd ..
   ```

3. Publish storage app and run the demo template

   ```sh
   git clone git@github.com:AutarkLabs/aragon-storage.git -b demo-template
   cd aragon-storage
   npm i # install dependencies
   npm run start:ipfs:template -- --client false
   ```

4. Start yet another terminal to run the customized client supporting About setting

   ```sh
   git clone git@github.com:AutarkLabs/aragon.git -b dev
   cd aragon
   npm i && npm run start:local # download deps and start the client
   ```

5. Open the browser at the newly created DAO page

   [http://localhost:3000/#/0xe5ac265B0FFE4b47C8386D7d715f3a3f6F8fb5B9](http://localhost:3000/#/0xe5ac265B0FFE4b47C8386D7d715f3a3f6F8fb5B9)

   > It should have About and Storage along with Voting and Token apps installed by default

### Development

To start development environment:

1. Install dependencies

   ```sh
   npm i
   ```

2. Run parcel server for frontend development (it also builds the frontend)

   ```sh
   npm run dev
   ```

3. On a second terminal launch script watcher for background worker development

   ```sh
   npm run watch:script
   ```

4. Yet on another terminal launch the aragon client with the app running and hot reload

   ```sh
   npm run start:http:template
   ```

### Publish

You can publish your app on [aragonPM](https://hack.aragon.org/docs/apm). See how in our [publish guide](https://hack.aragon.org/docs/guides-publish).

> **Note**\
> The [Template](https://github.com/aragon/aragon-react-boilerplate/blob/master/contracts/Template.sol) will not be published.

Example publishing command for Autark deployments:

```sh
npm run publish:patch -- --environment staging --apm.ipfs.rpc https://ipfs.autark.xyz:5001 --ipfs-check false
```

### Using a different Ethereum account

You can use a different account to interact with you app. [Check the documentation](https://hack.aragon.org/docs/guides-faq#set-a-private-key).

### Propagate content

You can propagate the content of your app on IPFS. Learn more in our [troubleshooting guide](https://hack.aragon.org/docs/guides-faq#propagating-your-content-hash-through-ipfs) or use the `aragon ipfs propagate` command:

```sh
npx aragon ipfs propagate <cid>
```

Where `cid` is your content id hash (this will be displayed after publishing).