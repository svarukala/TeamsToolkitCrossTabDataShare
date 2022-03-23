import { useState } from "react";
import { Image, Menu, Button, Input } from "@fluentui/react-northstar";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { Graph } from "./Graph";
import { CurrentUser } from "./CurrentUser";
import { useTeamsFx } from "./lib/useTeamsFx";
import { TeamsUserCredential } from "@microsoft/teamsfx";
import { useData } from "./lib/useData";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import * as microsoftTeams from "@microsoft/teams-js";

export function Welcome(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const steps = ["local", "azure", "publish"];
  const friendlyStepsName: { [key: string]: string } = {
    local: "1. Build your app locally",
    azure: "2. Provision and Deploy to the Cloud",
    publish: "3. Publish to Teams",
  };
  const [text, setText] = useState<string>();
  const [selectedMenuItem, setSelectedMenuItem] = useState("local");
  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  const { isInTeams } = useTeamsFx();
  const userProfile = useData(async () => {
    const credential = new TeamsUserCredential();
    return isInTeams ? await credential.getUserInfo() : undefined;
  })?.data;
  const userName = userProfile ? userProfile.displayName : "";
  const [entityId, setEntityId] = useState<string | undefined>();
  microsoftTeams.getContext((context) => {
    setEntityId(context.entityId);
  });

  const switchTabPage = () => {
    console.log("User clicked the switch button");
    console.log("ENTITYID: "+ entityId);
    console.log("https://teams.microsoft.com/l/entity/9d67195a-1e68-4ec8-8240-abdb6fbd108f/index2");
    var encodedContext = encodeURI(`{"subEntityId": "${text}" }`);
    microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/9d67195a-1e68-4ec8-8240-abdb6fbd108f/index2?context="+ encodedContext);
  }
  
  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">Congratulations{userName ? ", " + userName : ""}!</h1>
        <p className="center">Your app is running in your {friendlyEnvironmentName}</p>
        <Input
                            placeholder="Enter a value here to share with other tab"
                            fluid
                            clearable
                            value={text}
                            onChange={(e, data) => {
                                if (data) {
                                    setText(data.value);
                                }
                            }}
                            required />
        <Button primary content="Switch Tab" onClick={()=>switchTabPage()} />
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "local" && (
            <div>
              <EditCode showFunction={showFunction} />
              {isInTeams && <CurrentUser userName={userName} />}
              <Graph />
              {showFunction && <AzureFunctions />}
            </div>
          )}
          {selectedMenuItem === "azure" && (
            <div>
              <Deploy />
            </div>
          )}
          {selectedMenuItem === "publish" && (
            <div>
              <Publish />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
