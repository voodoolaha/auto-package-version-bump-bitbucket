# auto-package-version-bump-bitbucket

CLI to update package.json file on bitbucket repo using https://api.bitbucket.org/2.0/

Test bitbucket repo https://bitbucket.org/testworkspaceforautopr/test/src/main/

# Requrements

## node.js 18.x.x

## Added app pasword to Bitbucket user account

# Deployment

```
npm install
```

```
$ echo "USER_NAME=<YOUR_USER_NAME> \nPASSWORD=<YOUR_APP_PASSWORD>" >.env
```

# How to run

`node src/index.js`

##List of avaliable options

```Options:
  -w --workspace <workspace>                <optional> workspace.
  -r --repository <repository>              <optional> repository.
  -b --branch <branch>                      <optional> target branch.
  -pn --package-name <package-name>         <optional> name of the package.
  -pv --package-version <package-version>   <optional> target version of the package.
```

# TODO:

- tests (spike how to test fs)
- translation to typescript
- synchronous vs asyncronous fs spike
- error handling
- improve structure
- pulling updates if repo exists in local folder (current implementation) vs deleting and clonning again
- console.log -> logger

# Rsources:

- General guide for bitbucket API https://rewind.com/blog/using-bitbucket-api/
- Bitbucket API documentation https://developer.atlassian.com/cloud/bitbucket/rest/api-group-workspaces/#api-group-workspaces
- Simple Git Node.js package https://www.npmjs.com/package/simple-git
- Tool to convert hardcoded console commands to js code, possible to create fully functional CLI https://www.npmjs.com/package/commander
- Node.js fs documentation https://nodejs.org/api/fs.html
