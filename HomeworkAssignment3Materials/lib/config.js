/*
 * Create and export configuration variables
 *
 */

// Container for all the environments
var environments = {};

// Staging (default) environment
environments.staging = {
	'httpPort': 4000,
	'httpsPort': 4001,
	'envName': 'staging',
	'hashingSecret': 'thisIsASecret',
	'maxOrders': 5,
	'twilio': {
		'accountSid': 'AC3d9f0c7cbcd01b34c80ae44f7d262b9a',
		'authToken': 'db501e3b6fd065354ac1a2ee910db1f7',
		'fromPhone': '+126106009686',
		'toPhone': '+12076914123'
	},
	'templateGlobals': {
		'appName': 'OrderChecker',
		'companyName': 'Tony\'s Pizza House',
		'yearCreated': '1969',
		'baseUrl': 'http://localhost:4000/'
	}
};

// Production environment
environments.production = {
 	'httpPort': 6000,
 	'httpsPort': 6001,
 	'envName': 'production',
	'hashingSecret': 'thisIsAlsoASecret',
	'maxOrders': 5,
	'twilio': {
		'accountSid': 'AC3d9f0c7cbcd01b34c80ae44f7d262b9a',
		'authToken': 'db501e3b6fd065354ac1a2ee910db1f7',
		'fromPhone': '+126106009686',
		'toPhone': '+12076914123'
	},
	'templateGlobals': {
		'appName': 'OrderChecker',
		'companyName': 'Tony\'s Pizza House',
		'yearCreated': '1969',
		'baseUrl': 'http://localhost:6000/'
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
