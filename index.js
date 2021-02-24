const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
    const serviceUrl = core.getInput('serviceUrl');
    const apiToken = core.getInput('apiToken');
    const stage = core.getInput('stage');
    const stageDescription = core.getInput('stageDescription');
    const name = core.getInput('name');
    const description = core.getInput('description');
    const flow = core.getInput('flow');
    let type = core.getInput('type');
    const groupId = core.getInput('groupId');
    const artifactId = core.getInput('artifactId');
    const version = core.getInput('version');

    if (!apiToken) {
        core.setFailed('API token is required');
    }

    if (!stage) {
        core.setFailed('Stage is required');
    }

    if (!name) {
        core.setFailed('Artifact name is required');
    }

    if (!type) {
       type = 'DockerImage';
    }

    if (!type in ['JAR', 'WAR', 'EAR', 'DockerImage']) {
        core.setFailed('Unexpected type specified: ' + type);
    }

    if (type in ['JAR', 'WAR', 'EAR']) {
        if (!groupId || !artifactId) {
            core.setFailed('Group Id and Artifact Id are required for the Java artifacts');
        }
    }

    if (!version) {
        core.setFailed('Version is required');
    }

    let payload = {
        stage,
        artifact_name: name,
        type,
        version,
    };

    if (stageDescription) {
        payload = {
            ...payload,
            stage_description: stageDescription,
        }
    }

    if (description) {
        payload = {
            ...payload,
            artifact_description: description,
        }
    }

    if (flow) {
        payload = {
            ...payload,
            flow,
        }
    }

    if (groupId) {
        payload = {
            ...payload,
            group_id: groupId,
        }
    }

    if (artifactId) {
        payload = {
            ...payload,
            artifact_id: artifactId,
        }
    }
    console.log(`Publishing artifact '${name}' to the ${serviceUrl}`);
    axios.put(`${serviceUrl}/artifacts/versions`, payload, {
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Publish Artifact Github Action v1.0.0',
            'Authorization': `Bearer ${apiToken}`,
        }
    }).then(response => {
        if (response.status !== 202) {
            core.setFailed(`Cannot publish artifact '${name}' version: ${response.data.message}`);
        } else {
            console.log(`Successfully published artifact '${name}' version: ${version}`);
        }
    }).catch(error => {
        console.log(error);
        core.setFailed(error.data.message);
    });

    // Get the JSON webhook payload for the event that triggered the workflow
    const p = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${p}`);
} catch (error) {
    core.setFailed(error.message);
}
