import fs from 'fs';

import updateFile from '../fileProcessing.js';
import { getLocalDirectory, clone, pull, commit, push } from '../gitActions.js';
import createPullRequest from '../pullRequest.js';

export default async function updateCommand(program) {
  program
    .command('updater')
    .description('Create PR on bitbucket with update package in package.json')
    .option('-w --workspace <workspace>')
    .option('-r --repository <repository>')
    .option('-b --branch <branch>')
    .option('-pn --package-name <package-name>')
    .option('-pv --package-version <package-version>')
    .action(async (options) => {
      const workspace = options.workspace || 'testworkspaceforautopr';
      const repository = options.repository || 'test';
      const targerBranch = options.branch || 'main';
      const packageName = options.packageName || 'redoc';
      const packageVersion = options.packageVersion || '2.0.0';

      const sourceBranch = `${packageName}-${packageVersion}`;
      const title = `Update ${packageName} to ${packageVersion}`;

      try {
        if (fs.existsSync(getLocalDirectory(repository))) {
          await pull(repository, sourceBranch);
        } else {
          await clone(workspace, repository, sourceBranch);
        }

        const updatedFilesLocations = await updateFile(repository, packageVersion, packageName);
        await commit(
          repository,
          `Update ${packageName} to ${packageVersion}`,
          updatedFilesLocations,
        );
        await push(repository, sourceBranch, targerBranch);
        await createPullRequest(workspace, repository, sourceBranch, targerBranch, title);
        console.log('Pull Request created!');
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
      process.exit();
    });
}
