/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./jest.setup.js'],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    clearMocks: true,
  };
  
};