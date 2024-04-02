import { promises as fs } from 'fs';
import { getLocalDirectory } from './gitActions.js';

const findPackages = async (localDirectory) => {
  try {
    const files = await fs.readdir(localDirectory);
    const packageJsonFiles = [];
    for (let file of files) {
      const filePath = `${localDirectory}/${file}`;
      const stats = await fs.lstat(filePath);
      if (stats.isDirectory()) {
        const subDirectoryPackageJsonFiles = await findPackages(filePath);
        packageJsonFiles.push(...subDirectoryPackageJsonFiles);
      } else if (file === 'package.json') {
        packageJsonFiles.push(filePath);
      }
    }
    return packageJsonFiles;
  } catch (error) {
    console.error('Error while finding packages:', error);
    return [];
  }
};

const updatePackage = async (path, packageVersion, packageName) => {
  try {
    const packageJson = await fs.readFile(path, 'utf8');
    let toUpdate = false;
    if (!packageJson) {
      console.log('package.json not found');
      return false;
    }
    let packageJsonObject;
    try {
      packageJsonObject = JSON.parse(packageJson);
    } catch (e) {
      console.error('Wrong format ' + e.message);
      return false;
    }
    if (packageJsonObject.dependencies && packageJsonObject.dependencies[packageName]) {
      packageJsonObject.dependencies[packageName] = packageVersion;
      toUpdate = true;
    } else {
      console.log(`${packageName} not found in dependencies ${path}`);
    }
    if (packageJsonObject.devDependencies && packageJsonObject.devDependencies[packageName]) {
      packageJsonObject.devDependencies[packageName] = packageVersion;
      toUpdate = true;
    } else {
      console.log(`${packageName} not found in devDependencies ${path}`);
    }
    if (toUpdate) {
      console.log(`Updating from ${packageName} to ${packageVersion}`);
      await fs.writeFile(path, JSON.stringify(packageJsonObject, null, 2));
      return true;
    }
  } catch (error) {
    console.error('Error while updating:', error);
    return false;
  }
};

export default async function updateFile(repository, packageVersion, packageName) {
  try {
    const localDirectory = await getLocalDirectory(repository);
    const packageJsonLocations = await findPackages(localDirectory);
    const updatedFiles = [];
    for (let packageJsonLocation of packageJsonLocations) {
      if (await updatePackage(packageJsonLocation, packageVersion, packageName)) {
        updatedFiles.push(packageJsonLocation.replace(localDirectory + '/', ''));
      }
    }
    return updatedFiles;
  } catch (error) {
    console.error('Error while updating file:', error);
    return [];
  }
}
