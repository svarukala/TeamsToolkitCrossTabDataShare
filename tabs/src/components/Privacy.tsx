import React from "react";
import { useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import "./sample/Welcome.css";

export default function Privacy() {
  const [data, setData] = useState<string | undefined>("local");
  microsoftTeams.getContext(function (context) {
    console.log(context.subEntityId);
    //setData(context.subEntityId??"No data from other tab");
    setData(context && context.subEntityId ? context.subEntityId : "No data shared from other tab");
    
  });

  return (
    <div className="center">
      <h1>Privacy Tab</h1>
      <h4>Here is the data from shared from other tab:</h4>
      {data && <h2>{data}</h2>}
    </div>
  );
}
