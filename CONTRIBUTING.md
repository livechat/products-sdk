# 🏗 Contributing

## Proposing a Change

In order to propose a change or request new feature we recommend filling the [Feature request](https://github.com/livechat/products-sdk/issues/new/choose).

## Reporting a Bug

We track public bugs in [GitHub Issues](https://github.com/livechat/products-sdk/issues). If you would like to report one we recommend filling the [Bug report](https://github.com/livechat/products-sdk/issues/new/choose).

## Development Workflow

- Install the dependecies using `npm`. This will also bootstrap a monorepo installing dependencies inside each package and linking them together.

- Build the libraries using `npm build` at the top level or inside single package.

## Versioning

This project uses [turborepo](https://turbo.build/repo) to manage versions and publishing.

## Branch Organization

Submit all changes directly to the `master` branch. We don’t use separate branches for development or for upcoming releases.

## Testing

### Manual testing

TODO

### Automated testing

#### Unit tests

Packages contain a suite of unit tests dedicated for their core functionalities. Whenever you make change or introduce some new functionality, please make sure that existing tests pass and that the coverage remains at the same level.

- To run tests use: `npm test`
- Tests are located in: `packages/**/src/**/*.spec.ts`
- In order to verify the current coverage use: `npm test -- --coverage`

### Coverage

TODO
