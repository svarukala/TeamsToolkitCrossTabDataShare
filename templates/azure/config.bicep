@secure()
param provisionParameters object
param provisionOutputs object
// Get existing app settings and site config for merge
var simpleAuthCurrentAppSettings = list('${provisionOutputs.simpleAuthOutput.value.webAppResourceId}/config/appsettings', '2021-02-01').properties

// Merge TeamsFx configurations to Simple Auth resources
module teamsFxSimpleAuthConfig './teamsFx/simpleAuth.bicep' = {
  name: 'addTeamsFxSimpleAuthConfiguration'
  params: {
    provisionParameters: provisionParameters
    provisionOutputs: provisionOutputs
    currentAppSettings: simpleAuthCurrentAppSettings
  }
}