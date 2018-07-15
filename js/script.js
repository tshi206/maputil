(function (OC, $) {

	console.log("maputil script.js entered");
	console.log("OC => " + OC);
	console.log(OC);
	console.log("$ => " + $);
	console.log($);

	$(document).ready( () => { // IMPORTANT NOTICE : $.ready( fn ) DOES NOT WORK, IT MUST BE $(document).ready( fn )

		console.log("document ready");

        // this will be map to 'recording#index', the last bit is the 'url' part of the corresponding route, see routes
        let baseUrl = OC.generateUrl("/apps/maputil/recordings"); // '/recordings' is the last bit

        console.log("maputil baseUrl : " + baseUrl);

        let placeholder = $("#placeholder");

        $('#update_second_standalone').on('click', () => {

            $.ajax(baseUrl + "/update-standalone" + "/2", {
                method: 'PUT',
                contentType: 'application/json'
            }).done( (data) => {
                    console.log(data);
                    placeholder.empty(); // remove all child nodes
                    let sometext = document.createElement("H1");
                    sometext.id = "hi";
                    // sometext is of Node type not jQuery Object type hence we use Node method
                    // noinspection JSUnresolvedVariable
                    sometext.appendChild(document.createTextNode("id = " + data.id + " is_standalone = " + data.isStandalone + "\n" + JSON.stringify(data)));
                    placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                }
            ).fail( (response) => {
                    console.log(response);
                    placeholder.empty(); // remove all child nodes
                    let sometext = document.createElement("H1");
                    sometext.id = "hi";
                    // sometext is of Node type not jQuery Object type hence we use Node method
                    sometext.appendChild(document.createTextNode(JSON.stringify(response)));
                    placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                }
            );

        });

        $('#update_second_representative').on('click', () => {

            $.ajax(baseUrl + "/update-representative" + "/2", {
                method: 'PUT',
                contentType: 'application/json'
            }).done( (data) => {
                    console.log(data);
                    placeholder.empty(); // remove all child nodes
                    let sometext = document.createElement("H1");
                    sometext.id = "hi";
                    // sometext is of Node type not jQuery Object type hence we use Node method
                    // noinspection JSUnresolvedVariable
                    sometext.appendChild(document.createTextNode("id = " + data.id + " is_representative = " + data.isRepresentative + "\n" + JSON.stringify(data)));
                    placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                }
            ).fail( (response) => {
                    console.log(response);
                    placeholder.empty(); // remove all child nodes
                    let sometext = document.createElement("H1");
                    sometext.id = "hi";
                    // sometext is of Node type not jQuery Object type hence we use Node method
                    sometext.appendChild(document.createTextNode(JSON.stringify(response)));
                    placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                }
            );

        });


        // test ['name' => 'recording#getCities', 'url' => '/cities', 'verb' => 'GET']
        $.get(OC.generateUrl("/apps/maputil/cities"), (cities) => {
            console.log(cities);
            let citySelector = $('#existing_cities');
            cities.forEach( city => {
                let li = document.createElement("LI");
                li.value = city;
                let t = document.createTextNode(city);
                li.appendChild(t); // this is dom Node method
                citySelector.append(li); // this is jQuery Object method, jQuery sits on top of DOM model but they have different types.
            });
        });

        // test ['name' => 'recording#getSuburbs', 'url' => '/suburbsAt/{city}', 'verb' => 'GET']
        $.get(OC.generateUrl("/apps/maputil/suburbsAt/Auckland"), (suburbs) => { // 'Auckland', case sensitive
            console.log(suburbs);
            let suburbSelector = $('#existing_suburbs_by_auckland');
            suburbs.forEach( suburb => {
                let li = document.createElement("LI");
                li.value = suburb;
                let t = document.createTextNode(suburb);
                li.appendChild(t); // this is dom Node method
                suburbSelector.append(li); // this is jQuery Object method
            });
        });

        // test ['name' => 'recording#showRecordings', 'url' => '/recordings/{city}/{suburb}', 'verb' => 'GET']
        $.get(OC.generateUrl("/apps/maputil/recordings/Auckland/Auckland Central"), (recordings) => { // 'Auckland Central', case sensitive
            console.log(recordings);
            let recordingSelector = $('#existing_recordings_by_auckland_auckland_central');
            recordings.forEach( recording => {
                let li = document.createElement("LI");
                li.id = "li-" + recording.id;
                li.appendChild(document.createTextNode(recording.filename));

                let standalone_btn = document.createElement("BUTTON");
                standalone_btn.id = "standalone-" + recording.id;
                standalone_btn.appendChild(document.createTextNode("Update standalone state for recording id : " + recording.id));
                li.appendChild(standalone_btn);

                let representative_btn = document.createElement("BUTTON");
                representative_btn.id = "representative-" + recording.id;
                representative_btn.appendChild(document.createTextNode("Update representative state for recording id : " + recording.id));
                li.appendChild(representative_btn);

                recordingSelector.append(li);

                // now btns are shown on the site we can attach an event listener like so
                $("#" + standalone_btn.id).on('click', () => {
                    console.log("clicked");
                    $.ajax(baseUrl + "/update-standalone" + "/" + recording.id, {
                        method: 'PUT',
                        contentType: 'application/json'
                    }).done( (data) => {
                            console.log(data);
                            placeholder.empty(); // remove all child nodes
                            let sometext = document.createElement("H1");
                            sometext.id = "hi";
                            // sometext is of Node type not jQuery Object type hence we use Node method
                            // noinspection JSUnresolvedVariable
                            sometext.appendChild(document.createTextNode("id = " + data.id + " is_standalone = " + data.isStandalone + "\n" + JSON.stringify(data)));
                            placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                        }
                    ).fail( (response) => {
                            console.log(response);
                            placeholder.empty(); // remove all child nodes
                            let sometext = document.createElement("H1");
                            sometext.id = "hi";
                            // sometext is of Node type not jQuery Object type hence we use Node method
                            sometext.appendChild(document.createTextNode(JSON.stringify(response)));
                            placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                        }
                    );
                });

                $("#" + representative_btn.id).on('click', () => {
                    console.log("clicked");
                    $.ajax(baseUrl + "/update-representative" + "/" + recording.id, {
                        method: 'PUT',
                        contentType: 'application/json'
                    }).done( (data) => {
                            console.log(data);
                            placeholder.empty(); // remove all child nodes
                            let sometext = document.createElement("H1");
                            sometext.id = "hi";
                            // sometext is of Node type not jQuery Object type hence we use Node method
                            // noinspection JSUnresolvedVariable
                            sometext.appendChild(document.createTextNode("id = " + data.id + " is_representative = " + data.isRepresentative + "\n" + JSON.stringify(data)));
                            placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                        }
                    ).fail( (response) => {
                            console.log(response);
                            placeholder.empty(); // remove all child nodes
                            let sometext = document.createElement("H1");
                            sometext.id = "hi";
                            // sometext is of Node type not jQuery Object type hence we use Node method
                            sometext.appendChild(document.createTextNode(JSON.stringify(response)));
                            placeholder.append(sometext); // placeholder is a jQuery Object type hence we use jQuery method
                        }
                    );
                });
            });
        });

    });

})(OC, jQuery);


// (function (OC, window, $, undefined) {
// 	'use strict';
//
// 	$(document).ready(function () {
//
//         console.log("maputil script.js entered");
//         console.log("OC => " + OC);
//         console.log(OC);
//         console.log("$ => " + $);
//         console.log($);
//         console.log("wtf is this " + undefined);
//
// 	});
//
// })(OC, window, jQuery);