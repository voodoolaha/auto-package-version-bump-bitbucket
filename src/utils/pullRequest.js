import fetch from 'node-fetch';
import base64 from 'base-64';

const USER_NAME = process.env.USER_NAME;

const PASSWORD = process.env.PASSWORD;

export default async function createPullRequest(
  workspace,
  repository,
  sourceBranch,
  destinationBranch,
  title,
) {
  console.log('Creating pull request with updated package.json');
  const prUrl = `https://api.bitbucket.org/2.0/repositories/${workspace}/${repository}/pullrequests`;
  const body = {
    title: title,
    description: 'Update package.json',
    source: {
      repository: {
        full_name: `${workspace}/${repository}`,
      },
      branch: {
        name: sourceBranch,
      },
    },
    destination: {
      repository: {
        full_name: `${workspace}/${repository}`,
      },
      branch: {
        name: destinationBranch,
      },
    },
  };

  try {
    const response = await fetch(prUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${base64.encode(USER_NAME + ':' + PASSWORD)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error('Error in the process of PR creation', error.message);
  }
}
