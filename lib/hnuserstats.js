var hnuserstats = function()
{
	var request = require('request'); // change to browser-request if browserifying this

	this.get_data_and_stats = function(author, callback)
	{
		var async = require('async');

		// TODO: use async to do hnuserdownload and get_hnsearch_user_stats and then call getstats afterward
	}

	// TODO: move into own npm module?
	this.get_hnsearch_user_stats = function(data)
	{

	}

	var _get_stats = function(data)
	{
		var found_hit_type = false;
		var results = data.hits;
		var saved_results = {};
		saved_results.story_karma = 0;
		saved_results.story_count = 0;
		saved_results.comment_karma = 0;
		saved_results.comment_count = 0;

		for (i = 0; i < results.length; i++)
		{
			for (j = 0; j < results[i]._tags.length; j++)
			{
				if (results[i]._tags[j] === "story")
				{
					results[i].type = "story";
					saved_results.story_karma += results[i].points - 1;
					saved_results.story_count++;
					found_hit_type = true;
					break;
				} else if (results[i]._tags[j] === "comment")
				{
					results[i].type = "comment";
					saved_results.comment_karma += results[i].points - 1;
					saved_results.comment_count++;
					found_hit_type = true;
					if ((results.parent_id) === (results.story_id))
					{
						// TODO: is top-level (otherwise is a reply)
					}
					break;
				}
			}
			if (!found_hit_type)
			{
				console.log("unexpected hit type");
				console.log(results[i]);			
				continue;	
			}

			var d = new Date();
			d.setTime(results[i].created_at_i * 1000);
			d.setFullYear(d.getFullYear() + 1);
			if (d < new Date())
			{
				// TODO: more than a year old; track counts, karma
			} else
			{
				// TODO not more than a year old; track counts, karma
			}

			// TODO: hard to track: how long comment was posted after story was posted, karma of parent comment
			// TODO: track total karma per story?
			// TODO: keep track of popular words, popular story subjects, etc.
			// TODO? compare this data among users? see what has already been done first
			// TODO: check spelling?
			// TODO: make a list of URLs referred to in comments? (similar to what minimaxir did for submissions?); do something realtime with this?
		}
		return saved_results;
	}
};

// callback is a function with a param results
exports.hnuserstats = function(author, callback)
{
	var _hnuserstats = new hnuserstats();
	_hnuserstats.get_data_and_stats(author, callback);
}

exports.get_hnsearch_user_stats = function(author, callback)
{
	var _hnuserstats = new hnuserstats();
	_hnuserstats.get_hnsearch_user_stats(author, callback);	
}

// the callback will be called and passed params filename, csvcontents	
exports.to_csv = function(author, data, callback)
{
	// TODO: clean up list of columns, etc. (should be stats, not data)
	var json2csv = require('json2csv');
	json2csv(


	    {   data: data.hits, 
	        fields: ['created_at', 'points', 'type', 'comment_text', 'story_title', 'url', 'title', 'story_url', 'story_text', 'num_comments', 'created_at_i'],
	        fieldNames: ['created_at', 'points', 'type', 'comment_text', 'story_title', 'url', 'title', 'story_url', 'story_text', 'num_comments', 'created_at_i']
	    },
	    function(err, csv) {  
	        if (err)
	        	console.log(err);
	        else
	        {
	        	callback(author + ".csv", csv);
			}
	    }
	);
}
