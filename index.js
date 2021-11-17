const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const accessToken = core.getInput('access-token');
const packageName = core.getInput('package-name');
const versionsToKeep = core.getInput('versions-to-keep'); // *1


try {
	const octokit = new Octokit({
		auth: accessToken
	});

	console.info('package-name:', packageName);
	console.info('versions-to-keep:', versionsToKeep)

	console.info("find versions to delete");
	const versionsToDelete = findVersionsToDelete(octokit)
		.catch(e => console.error(e));

	versionsToDelete.then(versions => {
		console.info('going to delete the follwing versions: ', versions);
		versions.forEach(version => {
			deleteOldVersion(version, octokit);
		});
	});
} catch (error) {
	core.setFailed(error.message);
}


async function findVersionsToDelete(octokit) {
	let response = await octokit.rest.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser({
		package_type: 'container',
		package_name: packageName,
	});
	const data = response.data;
	let versions = new Map();
	data.forEach(version => {
		const updated = new Date(version.created_at);
		versions.set(updated, version.id);
	});
	const sortedVersions = [...versions]
		.sort((o1, o2) => o2[0].getTime() - o1[0].getTime())
		.map(tuple => tuple[1]);
	return sortedVersions.splice(versionsToKeep);
}


async function deleteOldVersion(version, octokit) {
	console.log("... deleting version ", version);
	await octokit.rest.packages.deletePackageVersionForAuthenticatedUser({
		package_type: 'container',
		package_name: packageName,
		package_version_id: version
	});
}
