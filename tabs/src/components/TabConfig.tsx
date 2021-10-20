import React from "react";
import "./App.css";
import { Button } from "@fluentui/react-northstar";
import * as microsoftTeams from "@microsoft/teams-js";

/**
 * The 'Config' component is used to display your group tabs
 * user configuration options.  Here you will allow the user to
 * make their choices and once they are done you will need to validate
 * their choices and communicate that to Teams to enable the save button.
 */
class TabConfig extends React.Component {
  render() {
    // Initialize the Microsoft Teams SDK
    microsoftTeams.initialize();

    /**
     * When the user clicks "Save", save the url for your configured tab.
     * This allows for the addition of query string parameters based on
     * the settings selected by the user.
     */


    const setTabPage = (pageNumber:number) => {
      console.log(pageNumber);
      microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
        const baseUrl = `https://${window.location.hostname}:${window.location.port}`;
        if(pageNumber===1)
        {
          microsoftTeams.settings.setSettings({
            suggestedDisplayName: "Terms of Use",
            entityId: "Test",
            contentUrl: baseUrl + "/index.html#/termsofuse",
            websiteUrl: baseUrl + "/index.html#/termsofuse",
          });
        }
        if(pageNumber===2)
        {
          microsoftTeams.settings.setSettings({
            suggestedDisplayName: "Privacy",
            entityId: "Test",
            contentUrl: baseUrl + "/index.html#/privacy",
            websiteUrl: baseUrl + "/index.html#/privacy",
          });
        }
        if(pageNumber===3)
        {
          microsoftTeams.settings.setSettings({
            suggestedDisplayName: "My Tab",
            entityId: "Test",
            contentUrl: baseUrl + "/index.html#/tab",
            websiteUrl: baseUrl + "/index.html#/tab",
          });
        }        
        saveEvent.notifySuccess();
        console.log(baseUrl);
      });
  }
    /**
     * After verifying that the settings for your tab are correctly
     * filled in by the user you need to set the state of the dialog
     * to be valid.  This will enable the save button in the configuration
     * dialog.
     */
    microsoftTeams.settings.setValidityState(true);

    return (
      <div>
        <h1>Tab Configuration</h1>
        <div>
          This is where you will add your tab configuration options the user can choose when the tab
          is added to your team/group chat.
          <Button primary content="Select Terms of use page" onClick={()=>setTabPage(1)} />
          <Button primary content="Select Privace page" onClick={()=>setTabPage(2)} />
          <Button primary content="Select Default page" onClick={()=>setTabPage(3)} />
        </div>
      </div>
    );
  }
}

export default TabConfig;
