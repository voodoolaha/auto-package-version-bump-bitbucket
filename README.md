##auto-package-version-bump-bitbucket

CLI to update package.json file on bitbucket repo using https://api.bitbucket.org/2.0/

##Requrements

#node.js 18.x.x
#Added app pasword to Bitbucket user account

##Deployment

`npm install`

##How to run

```
$ cat .env
USER_NAME=<YOUR_USER_NAME>
PASSWORD=<YOUR_APP_PASSWORD>
```

`node src/index.js`

##List of avaliable options

```Options:
  -w --workspace <workspace>                <optional> workspace.
  -r --repository <repository>              <optional> repository.
  -b --branch <branch>                      <optional> target branch.
  -pn --package-name <package-name>'        <optional> name of the package.
  -pv --package-version <package-version>   <optional> target version of the package.
```
