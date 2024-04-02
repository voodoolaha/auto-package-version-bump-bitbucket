import { simpleGit } from 'simple-git';

const getLocalDirectory = (repository) => `./local/${repository}`;

const clone = async (workspace, repository, branch) => {
  console.log('Clone repository');
  const remote = `https://${process.env.USER_NAME}@bitbucket.org/${workspace}/${repository}.git`;
  const localDirectory = getLocalDirectory(repository);

  await simpleGit().clone(remote, localDirectory);
  await simpleGit(localDirectory).checkoutLocalBranch(branch);
};

const pull = async (repository, branch) => {
  console.log('Pull changes');
  const localDirectory = getLocalDirectory(repository);
  await simpleGit(localDirectory).pull('origin', branch);
};

const commit = async (repository, message, updateFilesLocation) => {
  console.log('Commit changes');
  const localDirectory = getLocalDirectory(repository);
  await simpleGit(localDirectory).add(updateFilesLocation);
  await simpleGit(localDirectory).commit(message);
};

const push = async (repository, branch) => {
  console.log('Push changes');
  const localDirectory = getLocalDirectory(repository);
  await simpleGit(localDirectory).push('origin', branch);
};

export { getLocalDirectory, clone, pull, commit, push };
