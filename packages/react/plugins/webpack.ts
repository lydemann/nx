import { withReact } from './with-react';

// Support existing default exports as well as new named export.
const legacyExport: any = withReact();
legacyExport.withReact = withReact;

/** @deprecated use `import { withReact } from '@nrwl/react'` */
// This is here for backward compatibility if anyone imports {getWebpackConfig} directly.
// TODO(jack): Remove in Nx 16
legacyExport.getWebpackConfig = withReact();

module.exports = legacyExport;
