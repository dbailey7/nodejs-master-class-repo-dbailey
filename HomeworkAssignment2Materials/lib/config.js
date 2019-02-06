/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
	'httpPort': 3000,
	'httpsPort': 3001,
	'envName': 'staging',
	'hashingSecret': 'thisIsASecret',
	'maxChecks': 5,
	'twilio': {
		'accountSid': 'AC3d9f0c7cbcd01b34c80ae44f7d262b9a',
		'authToken': 'db501e3b6fd065354ac1a2ee910db1f7',
		'fromPhone': '+126106009686',
		'toPhone': '+12076914123'
	}
};

// Production environment
environments.production = {
 	'httpPort': 5000,
 	'httpsPort': 5001,
 	'envName': 'production',
	'hashingSecret': 'thisIsAlsoASecret',
	'maxChecks': 5,
	'twilio': {
		'accountSid': 'AC3d9f0c7cbcd01b34c80ae44f7d262b9a',
		'authToken': 'db501e3b6fd065354ac1a2ee910db1f7',
		'fromPhone': '+126106009686',
		'toPhone': '+12076914123'
	}
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
