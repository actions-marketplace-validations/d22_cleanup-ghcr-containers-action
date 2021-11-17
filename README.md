# Cleanup GHCR Containers Action
This action deletes old versions of containers on Github container registry (ghcr.io). 
By default only the latest version.

This action works only for containers, no other package format.

Since the [Github Token has no access to the container REST API](https://github.community/t/github-token-has-no-access-to-new-container-rest-apis/170395), a [PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with packages read- and write-permission is needed to access the packages. 
## Inputs
### `access-token`
**Required** Access token (PAT) with packages read- and write-permisson.
### `package-name`
**Required** Name of the package to work with
### `versions-to-keep`
How many versions should be left untouched. Default is '1', only the latest.
## Example usage
### Keep only the latest version:

	uses: d22/cleanup-ghcr-containers-action@v0.3.3
	with:
      access-token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
      package-name: 'master-tool-dev'

### Keep the latest and the two following versions:

	uses: d22/cleanup-ghcr-containers-action@v0.3.3
	with:
      access-token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
      package-name: 'master-tool-dev'
      versions-to-keep: 3 