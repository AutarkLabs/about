# Aragon Home App 🦅🏠

A new home page for Aragon DAOs

## Usage

### Development

To start development environment:

1. Install dependencies

   ```sh
   npm i
   ```

2. Run parcel server for frontend development (it also builds the frontend)

   ```sh
   npm run devserver
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

You can publish you app on [aragonPM](https://hack.aragon.org/docs/apm). See how in our [publish guide](https://hack.aragon.org/docs/guides-publish).

> **Note**<br>
> The [Template](https://github.com/aragon/aragon-react-boilerplate/blob/master/contracts/Template.sol) will not be published.

### Using a different Ethereum account

You can use a different account to interact with you app. [Check the documentation](https://hack.aragon.org/docs/guides-faq#set-a-private-key).

### Propagate content

You can propagate the content of your app on IPFS. Learn more in our [troubleshooting guide](https://hack.aragon.org/docs/guides-faq#propagating-your-content-hash-through-ipfs) or use the `aragon ipfs propagate` command:

```
npx aragon ipfs propagate <cid>
```

Where `cid` is your content id hash (this will be displayed after publishing).
