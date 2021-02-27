# Publish Artifact Javascript Action

[![Build Status](https://dev.azure.com/iktechio/artifactz.io/_apis/build/status/iktech.artifactz-azure-devops-extension?branchName=master)](https://dev.azure.com/iktechio/artifactz.io/_build/latest?definitionId=3&branchName=master)

This action publishes the artifact version to the https://artifactz.io.
If the specified stage does not exist, it will be created.
If artifact does not exist, it will be created. If it exists it will be modified using the information supplied with
the action.

## Inputs
### `serviceUrl`
**Required** The URL of the artifactz.io service. 
*Default:* https://artifactor.artifactz.io

### `apiToken`
**Required** The API token with write permissions 

### `stage`
**Required** Stage where artifact is getting published

### `stageDescription`
Stage description

### `name`
**Required** Name of the artifact to publish

### `description`
Description of the artifact that is getting published

### `flow`
Name of the flow that will be associated with the artifact

### `type`
**Required** Artifact type. Accepted values `JAR`, `WAR`, `EAR`, `DockerImage`

### `groupId`
The maven group Id for the Java artifacts

### `artifactId`
The maven artifact Id for the java artifacts'

### `version`
**Required** The artifact version to publish

## Example
Before adding this action to your workflow, set a secret with the API token in your project.
Then, you can publish the artifact details using this step:
```yaml
- name: Publish Artifact Info
  uses: iktech/publish-artifact-javascript-action@v1.0.0
  with:
    apiToken: ${{ secrets.ARTIFACTZ_TOKEN }}
    stage: Development
    flow: github
    type: JAR
    groupId: io.iktech
    artifactId: artifactz-client
    version: 1.0.0
```
