var mongoose = require('mongoose');

module.exports = function(mongoURL) {
	if (mongoURL == null) {
		var mongoServiceName = (process.env.DATABASE_SERVICE_NAME && process.env.DATABASE_SERVICE_NAME.toUpperCase()) || 'MONGODB',
		mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'] || 'localhost',
		mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'] || '27017',
		mongoDatabase = process.env[mongoServiceName + '_DATABASE'] || 'eduwebportal',
		mongoPassword = process.env[mongoServiceName + '_PASSWORD']
		mongoUser = process.env[mongoServiceName + '_USER'];

		if (mongoHost && mongoPort && mongoDatabase) {
				mongoURL = 'mongodb://';
				if (mongoUser && mongoPassword) {
				mongoURL += mongoUser + ':' + mongoPassword + '@';
			}
			mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
		}
		mongoose.connect(mongoURL);
		var connection = mongoose.connection;
		connection.on('error', function(err) {
			console.log('MongoDB connection failed. Throw');
			if (!err) {
				err = {error: 'unknown'};
			}
			throw err;
		});
		connection.once('open', function() {
			console.log('db connection open.');
		});
	}
};