module.exports = {
  name: 'games',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/games',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
