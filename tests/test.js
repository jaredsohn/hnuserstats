var hnuserstats = require("../lib/hnuserstats.js");
hnuserstats.hnuserstats("jaredsohn", function(results)
{
	// TODO: rewrite this
	if (results.hits.length > 0)
		console.log("passed");
});
