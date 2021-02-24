# Publish Artifact Javascript Action

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
