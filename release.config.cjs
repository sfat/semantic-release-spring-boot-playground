/**
 * @type {import('semantic-release').GlobalConfig}
 */
const ref = process.env.GITHUB_REF
const branch = ref.split('/').pop()

const config = {
  branches: [
    "main",
    {"name": "dev", "prerelease": true}
  ],
  tagFormat: "${version}",
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "conventionalcommits"
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "preset": "conventionalcommits"
      }
    ],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": [
          "CHANGELOG.md"
        ],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
};

const isPrereleaseBranch = config.branches.some(
    (b) =>
        typeof b === 'object' &&
        branch.includes(b.name.slice(0, -1)) &&
        b.prerelease,
)

if (!isPrereleaseBranch) {
  config.plugins.push('@semantic-release/changelog', [
    {
      "changelogFile": "CHANGELOG.md"
    },
  ])
}

module.exports = config;
