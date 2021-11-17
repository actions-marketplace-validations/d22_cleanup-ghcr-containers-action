# Cleanup GHCR Containers Action
This action deletes old versions of containers on Github container registry (ghcr.io). 
By default only the latest version.

This action works only with containers, no other package formats.

## Inputs
### `access-token`
**Required** Access token with packages read- and write-permisson.
### `package-name`
**Required** Name of the package to work with
    required: true
### `versions-to-keep`
How many versions should be left untouched. Default is '1', only the latest.
## Example usage
### Keep only the latest version:

	uses: d22/cleanup-ghcr-containers-action@v0.3.0
	with:
      access-token: ${{ secrets.GITHUB_TOKEN }}
      package-name: 'master-tool-dev'

### Keep the latest and the two following versions:

	uses: d22/cleanup-ghcr-containers-action@v0.3.0
	with:
      access-token: ${{ secrets.MY_PAT }}
      package-name: 'master-tool-dev'
      versions-to-keep: 3 