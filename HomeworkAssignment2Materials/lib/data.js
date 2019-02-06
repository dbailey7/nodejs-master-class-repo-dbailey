/*
 * Library for storing and editing data
 */

 // Dependencies
 var fs = require('fs');
 var path = require('path');
 var helpers = require('./helpers');

 // Container for the module (to be exported)
 var lib = {};

// Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = function(dir, file, data, callback){
	// Open the file for writing
	fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function(err, fileDescriptor){
		if(!err && fileDescriptor){
			// Convert data to string
			var stringData = JSON.stringify(data);

			// Write to file and close it
			fs.writeFile(fileDescriptor, stringData, function(err){
				if(!err){
					fs.close(fileDescriptor, function(err){
						if(!err){
							callback(false);
						} else {
							callback('Error closing new file.');
						}
					});
				} else {
					callback('Error writing to new file.');
				}
			});
		} else {
			callback('Could not create new file, it may alredy exist.');
		}
	});
};

// Read data from a file
lib.read = function(dir, file, callback){
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data){
    if(!err && data){ // Better to send back JSON-parsed data
      var parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};

// Update data in a file
lib.update = function(dir, file, data, callback){
  // Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function(err, fileDescriptor){
    if(!err && fileDescriptor){
      // Convert data to a string
      var stringData = JSON.stringify(data);

      // Truncate the file
      fs.truncate(fileDescriptor, function(err){
        if(!err){
          // Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, function(err){
            if(!err){
              fs.close(fileDescriptor, function(err){
                if(!err){
                  callback(false);
                } else {
                  callback('Error closing the existing file.');
                }
              });
            } else {
              callback('Error writing to existing file.');
            }
          });
        } else {
          callback('Error truncating file.');
        }
      });
    } else {
      callback('Could not open the file for update, it may not yet exist.');
    }
  });
};

// Delete a file
lib.delete = function(dir, file, callback){
  // Unlink the file
  var duhFile = lib.baseDir + dir + '/' + file + '.json';
  fs.unlink(duhFile, function(err){
      if(!err){
        callback(false);
      } else {
        callback('Error deleting file ');
      }
  });
};

// List all the items in a directory
lib.list = function(dir, callback){
  // fs.readdir(lib.basedir + 'dir' + '/', function(err, data){  // this line has two errors
  fs.readdir(lib.baseDir + dir + '/', function(err, data){
    if(!err && data && data.length > 0){
      var trimmedFilenames = [];
      data.forEach(function(fileName){
        trimmedFilenames.push(fileName.replace('.json', ''));
      });
      callback(false, trimmedFilenames);
    } else {
      callback(err, data);
    }
  });
};

// Export the module
module.exports = lib;
