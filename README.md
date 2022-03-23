# Introduction
This sample teams app is built using VS Teams Toolkit v2. It showcases how to switch from one tab to other while passing data to the destination tab. The sample shows how to use deep links, use the teams context to achieve the end goal.

# Scenario
Without going into details, I was dealing with a scenario where the users will be seeing bunch of tiles/cards in the home tab. When they pick a tile/card, it must open a second tab that shows additional details (double click) of that tile/card. Essentially the second tab is a dynamic tab as it shows details of the tile user picks from first tab.

# Solution
Each tab in a teams app can be addressed uniquely using its deep link. You can read up on [Teams Deep Links on MSDocs](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/deep-links). 
Here is an example deeplink:
https://teams.microsoft.com/l/entity/9d67195a-1e68-4ec8-8240-abdb6fbd108f/index2

We then have teams contextual information to display relevant content within a tab. You can access context information in two ways:
* Insert URL placeholder values.
* Use the Microsoft Teams JavaScript client SDK. 

I used one such placeholder parameter called "entityId" to pass the data from home tab to privacy tab (see the app demo in the GIF linked below).
From MS Docs:
>"entityId": The developer-defined unique ID for the entity this content points to. This must be used to restore to a specific state within an entity; for example, scrolling to or activating a specific piece of content.

# Demo
![Here is a quick demo of two tabs. Switch between tabs and send data between tabs](https://user-images.githubusercontent.com/2417337/138160486-680c12e9-58d4-4bad-b284-1f4ec5d11427.gif)

# Code

In welcome.tsx which is the home tab you will see this function that takes care of sending the data to the privacy tab using deep link along with the context variable.

```javascript
  const switchTabPage = () => {
    console.log("User clicked the switch button");
    console.log("ENTITYID: "+ entityId);
    console.log("https://teams.microsoft.com/l/entity/9d67195a-1e68-4ec8-8240-abdb6fbd108f/index2");
    var encodedContext = encodeURI(`{"subEntityId": "${text}" }`);
    microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/9d67195a-1e68-4ec8-8240-abdb6fbd108f/index2?context="+ encodedContext);
  }
```


