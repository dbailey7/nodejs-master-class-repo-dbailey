/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
	'port' : 12321,
 	'envName' : 'staging'
};

// Production environment
environments.production = {
 	'port' : 23432,
 	'envName' : 'production'
};

// Determine which environment was passed as command-line arg
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? 
	process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above; 
// if not, default it to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? 
	environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;	