export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['node_modules', 'src/test', 'src/types'],
  moduleNameMapper: {
    '^@(utils|domains)/(.*)$': '<rootDir>/src/$1/$2',
    '^@(utils|server|router)$': '<rootDir>/src/$1'
  },
  reporters: ['default'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { diagnostics: false, tsconfig: { rootDir: '.' } }]
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
}
