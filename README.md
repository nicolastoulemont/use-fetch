# Use-form

This use-fetch utility hook implement state-while-revalidate data-fetching with a cache using sha-256 hashs of the request url and params as keys.

## Disclaimer

This is a work in progress tool and mainly aimed at my personal use accross my projects.

## Installation

```bash
npm install @nicolastoulemont/use-fetch
or
yarn add @nicolastoulemont/use-fetch
```

## Usage

- Basic usage

```typescript
import { useFetch } from '@nicolastoulemont/use-fetch';

export function BasicComponent() {
  const { response, loading, error, fetchy } = useFetch(
    '[DATA_SOURCE_URL]',
    fetchOptions
  );

  return (
    <div>
      <button onClick={fetchy}></button>
      {loading && <div>Loading...</div>}
      {response && <div>{JSON.stringify(response, null, 2)}</div>}
    </div>
  );
}
```

## Built with

- [tsdx](https://github.com/jaredpalmer/tsdx)
- [React](https://github.com/facebook/react)

## Versionning

This tool use [SemVer](http://semver.org/) for versioning.

## Licence

MIT
