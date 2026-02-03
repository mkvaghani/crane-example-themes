module.exports = {
	// Tag prefix for this theme (matches CI tag format: atelier-v1.2.3)
	tagPrefix: 'atelier-v',

	// Types that trigger releases and appear in changelog
	// Following Keep a Changelog 1.1.0: https://keepachangelog.com/en/1.1.0/
	types: [
		{ type: 'feat', section: 'Added' },
		{ type: 'fix', section: 'Fixed' },
		{ type: 'perf', section: 'Changed' },
		{ type: 'refactor', section: 'Changed' },
		{ type: 'docs', hidden: true }, // Don't show in changelog
		{ type: 'style', hidden: true }, // Don't show in changelog
		{ type: 'test', hidden: true }, // Don't show in changelog
		{ type: 'build', hidden: true }, // Don't show in changelog
		{ type: 'ci', hidden: true }, // Don't show in changelog
		{ type: 'chore', hidden: true }, // Don't show in changelog
	],
  
	// Skip automatic git operations (we'll do them in GitHub Actions)
	skip: {
		bump: false,      // We DO want version bumping
		changelog: false, // We DO want changelog generation
		commit: true,     // We'll commit in GitHub Actions
		tag: true,        // We'll tag in GitHub Actions
	},
  
	// Ignore merge commits
	issuePrefixes: ['#'],
  
	// Customize commit URLs (GitHub)
	commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
	compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
	userUrlFormat: '{{host}}/{{user}}',
  
	// Custom releaseCommitMessageFormat
	releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  
	// Prettier changelog following Keep a Changelog 1.1.0
	header: '# Changelog\n\nAll notable changes to the Atelier Theme will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).\n\n',
  
	// Commit types that should bump the version
	// (all feat/fix/perf will bump, others won't)
	preMajor: false, // Already past 0.x.x stage
}
