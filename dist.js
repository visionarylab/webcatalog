/* eslint-disable no-console */
const path = require('path');
const fs = require('fs-extra');
const builder = require('electron-builder');

const { Platform, Arch } = builder;

console.log(`Machine: ${process.platform}`);

const targets = process.platform === 'darwin' ?
  Platform.MAC.createTarget() : Platform.WINDOWS.createTarget(['nsis'], Arch.x64);

Promise.resolve()
  .then(() => {
    const opts = {
      targets,
      config: {
        appId: 'com.juli.app',
        asar: false,
        directories: {
          buildResources: 'build-resources',
        },
        mac: {
          category: 'public.app-category.utilities',
        },
        afterPack: ({ appOutDir }) => {
          console.log('appOutDir:', appOutDir);

          const resourcesAppPath = process.platform === 'darwin' ? path.join(
            appOutDir,
            'Juli.app',
            'Contents',
            'Resources',
            'app',
          ) : path.join(
            appOutDir,
            'resources',
            'app',
          );

          const sourceTemplatePath = path.resolve(__dirname, 'template');

          const destTemplatePath = path.join(resourcesAppPath, 'template');

          console.log('Copying additional files...');

          return fs.copy(sourceTemplatePath, destTemplatePath);
        },
      },
    };

    return builder.build(opts);
  })

  .then(() => {
    console.log('build successful');
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
