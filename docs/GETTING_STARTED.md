# Customize your organization home page
## Demo
Checkout how an Aragon organization with a customized home page looks here: 
https://preview.autark.xyz/#/preview/0xbe525e5d313296385814a24b760c3f3fc04a8748

## Background
Whenever we initially proposed the [Organization Identity initiative](https://github.com/AutarkLabs/flock/blob/autark-proposal/teams/Autark/2019Q1-2.md#i06---dao-identity) we had described an “About app” to manage organization data blobs such as a manifesto, mission statement, team information etc. In April 2019, we began to make the case that instead of a separate About app, an organization should be able to customize their Home app. We [received buy-in from the greater community](https://forum.aragon.org/t/proposed-design-for-a-daos-home-page-within-aragon/826) on this approach.

To implement this, it required:
1. Building a new background app, the [Storage app](https://github.com/AutarkLabs/aragon-storage), to allow organizations to store custom settings. It’s a background app similar to the vault, such that there is no UI for it.
2. Extending the Aragon Client to connect the Settings page to this Storage app. It needed to save and fetch data from the Storage app, and provide a new setting in the UI for changing the home app that is in the left navigation.
3. Building a custom Home app, that allows organizations to manage the information displayed on the Home app. This is where you can add your mission statement, team members, link to your manifesto, etc! This is managed with a new markdown editor component that we developed, with the content stored on IPFS.

## Using the new Home app (alpha)
Here are instructions on adding the home app to a Rinkeby DAO. We recommend that you don’t install it to a DAO that you are actively using for operations, as these are not the official packages and we plan to make a few more enhancements before the official releases.

1. If you don’t have an organization, create a new one using rinkeby.aragon.org or rinkeby.autark.xyz
Make note of your organization name (e.g. <dao-name>.aragonid.eth)
2. Install the Home app and the Storage app – this requires using the aragon-cli. The steps below are an insecure, yet fast way to do it as we are setting the permissions to be open. You may want to install and then set the permission in a 
different step if this worries you (see example [here](https://hack.aragon.org/docs/guides-custom-deploy)), or make updates in your Permissions app after it’s installed. 

   * Install the home app:
      ```dao install <dao-name> home-preview.open.aragonpm.eth --set-permissions open --environment aragon:rinkeby```
   * Install the storage app: ```dao install <dao-name> storage-preview.open.aragonpm.eth --set-permissions open --environment aragon:rinkeby```

4. Go back to your browser, and visit your organization at preview.autark.xyz/#/<dao-name>/settings – note that it won’t work if you visit your organization at rinkeby.aragon.org or rinkeby.autark.xyz, as you have to use our experimental client.
5. In this Settings app, and change the home page to the “Home” option in the dropdown.
You will be prompted to sign two transactions. After those actions are approved, you should see the changes in your organization. If you installed the apps with open permissions like above, the changes will be reflected right away. Otherwise it may potentially require a vote to approve it.
6. Visit your Home app and hover over the two content widgets. You will see a pencil icon which you can click to customize the landing page for your organization!

## Product Notes
* If you setup the new Home app to be the default, there is a bit of a flash of the old home app when you first load your organization. There is a way to improve this interaction by making additional changes to the client so it reads the custom settings before it displays any apps. We plan on discussing this further with Aragon One to reach consensus on the best technical solution to improve this UX.
* We plan to improve the UX with regards to the step in the Settings app where you sign two transactions to set your new default home page. It’s not very intuitive right now that you have to wait to sign a second transaction.
* Right now, the Home app is pinning content to Autark’s IPFS node, but there will be a more [robust solution](https://medium.com/open-work-labs/smart-contract-based-ipfs-storage-for-daos-39c145f3042d) implemented in AGP-73. If you have trouble seeing the content, you may want to change the IPFS gateway in your Settings to be pointed at http://ipfs.autark.xyz/ipfs
* [In AGP-73](https://www.autark.xyz/proposal) we will continue our work on the Home app as part of our “Organization Insights” initiative which will an organization to manage more than two content blocks and add additional widgets such as recent votes and other valuable intel.
