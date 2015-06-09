

function getXMLData(url, callback) {
	$.getJSON('http://anyorigin.com/dev/get?url=' + url + '&callback=?', function(data){
		var doc = $($.parseXML(data.contents)),
			array = [];

		doc.find('post').each(function (index, element) {

			//Turns it back into a jQuery object
			var el = $(element)

			//Add it to the array;
			array.push({
				"id": el.find('categories_id').text(),
				"name": el.find('categories_name').text(),
				"image": el.find('categories_image').text(),
				"parentID": el.find('parent_id').text(),
			})
		})

		//callback
		;(callback || function () {})(array);
	})
}





//Shortcut for $.ready() - it fires when the document is `ready`
$(function () {

	getXMLData('http://constructionsupply.com.au/webservice.php?action=categories', function (json) {
		console.log(json);

		var baseItem = $('<img>')
							.addClass('thumbnail-image');

		for (var i in json) {
			baseItem
				.clone()

				.attr('src', json[i].image)

				//change this to whereever it has to go.
				.appendTo('body')
		}
	})


})