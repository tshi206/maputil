(function (OC, $) {
	$(document).ready(() => { // IMPORTANT NOTICE : $.ready( fn ) DOES NOT WORK, IT MUST BE $(document).ready( fn )
		console.log("document start");

		let citychoosen = "default";
		let suburbchoosen = "default";
		let tableStatus = "R";
		function Citylist(baseUrl) {
			this._baseUrl = baseUrl;
			this._cities = [];
		}

		Citylist.prototype = {
			loadAll: function () {
				let deferred = $.Deferred();
				let self = this;
				$.get(self._baseUrl+"/cities").done(function (cities) {
					self._cities = cities;
					self.display(cities);
					deferred.resolve();
				}).fail(function () {
					deferred.reject();
				});
				return deferred.promise();
			},
			display: function(cities){
				let list = $('#citylist');
				for(let i = 0; i < cities.length; i++){
				    let option = document.createElement("option");
				    option.text = cities[i];
				    option.value = cities[i];
				    list.append(option);
				}
			}
		};

		$('#citylist').change(function() {
			let deferred = $.Deferred();
			let city = $('#citylist').val();
			citychoosen = city;
			if (city != "default") {
				$('#suburblist').prop('disabled',false);
				$.get(baseUrl + "/suburbsAt/" + city).done(function (suburbs) {
					let list = $('#suburblist');
					// let defaultPption = document.createElement("option");
					// defaultPption.text = "Choose...";
                    let defaultPption = $('<option>').text("Choose...").attr('value','default');
					list.empty().append(defaultPption);
					for (let i = 0; i < suburbs.length; i++) {
						let option = document.createElement("option");
						option.text = suburbs[i];
						list.append(option);
					}
					deferred.resolve();
				}).fail(function () {
					deferred.reject();
					alert("fail to get suburb lists");
				});
			}else if(city == "default"){
				let defaultPption = document.createElement("option");
				defaultPption.text = "Choose...";
				$('#suburblist').empty().append(defaultPption).prop('disabled',true);
			}
            $('#typeList').val("default").attr('selected','selected');
            $('#typeList').prop('disabled',true);
            let mytable = $('table#representative > tbody');
            let myheader = $('table#representative > thead');
            mytable.html('');
            myheader.html('');
            let header =$('<tr>')
                .append($('<th>').attr('scope','col').text(''))
                .append($('<th>').attr('scope','col').text('#'))
                .append($('<th>').attr('scope','col').text('ID'))
                .append($('<th>').attr('scope','col').text('Filename'))
                .append($('<th>').attr('scope','col').text('content'))
                .append($('<th>').attr('scope','col').text('Type'))
                .append($('<th>').attr('scope','col').text('Upload Date'))
                .append($('<th>').attr('scope','col').text('Choose').attr('class','buttons'));
            myheader.append(header);

            mytable = $('table#stand-along > tbody');
            myheader = $('table#stand-along > thead');
            mytable.html('');
            myheader.html('');
            header =$('<tr>')
                .append($('<th>').attr('scope','col').text('#'))
                .append($('<th>').attr('scope','col').text('ID'))
                .append($('<th>').attr('scope','col').text('Filename'))
                .append($('<th>').attr('scope','col').text('content'))
                .append($('<th>').attr('scope','col').text('Upload Date'))
                .append($('<th>').attr('scope','col').text('Check').attr('class','buttons'));
            myheader.append(header);


			return deferred.promise();
		});

		function createTable(recordings){
				console.log("DEBUG INFORMATION: recording data retrieve");
				console.log(recordings);
				//saving data
				let repsentativeDataId = 0,
					representativeDataFalseIdArray = [];

				recordings.forEach(recording =>{
					if(recording.isRepresentative == 1){
						repsentativeDataId = recording.id;
					}else{
						representativeDataFalseIdArray.push(recording.id);
					}
				});

				//Dynamically inserting representative table items
				let mytable = $('table#representative > tbody');
				let myheader = $('table#representative > thead');
				mytable.html('');
				myheader.html('');
				let header =$('<tr>')
					.append($('<th>').attr('scope','col').text(''))
					.append($('<th>').attr('scope','col').text('#'))
					.append($('<th>').attr('scope','col').text('ID'))
					.append($('<th>').attr('scope','col').text('Filename'))
					.append($('<th>').attr('scope','col').text('content'))
					.append($('<th>').attr('scope','col').text('Type'))
					.append($('<th>').attr('scope','col').text('Upload Date'))
					.append($('<th>').attr('scope','col').text('Choose').attr('class','buttons'));
				myheader.append(header);
				let count = 1;
				for(let i = recordings.length-1; i>=0; i--){
					let recording = recordings[i];
					let radiobutton = $('<input>').attr('type','radio').attr('name','optradio')
						.on('click', () => {
							//saving data
							if(repsentativeDataId != 0){
								representativeDataFalseIdArray.push(repsentativeDataId);
							}
							repsentativeDataId = recording.id;
							representativeDataFalseIdArray = representativeDataFalseIdArray.filter(function(id){
								return id != repsentativeDataId;
							});

							$.ajax(baseUrl+"/recordings/update-representative-for-radio-btn",{
								method: 'POST',
								contentType: 'application/json',
								data: JSON.stringify({
									idToSetTrue: repsentativeDataId,
									arrayOfIdsToSetFalse:representativeDataFalseIdArray
								})
							}).done(function(response){
								console.log(response);
								alert("table is updated");
							}).fail(function(response){
								alert("fail");
							});
						});
					if(recording.isRepresentative == 1){
						radiobutton.attr('checked', true);
					}

					let filename = recording.filename.split(".")[0];
					let hyperLinkDownload = $('<a>').attr('href',baseUrl+'/download/'+recording.id).text(filename).addClass('hyperLinkDownload');
					let dataCheckbox = $('<input>').attr('type','checkbox').attr('name','dataCheck').attr('value',recording.id);
					let row =$('<tr>')
						.append($('<th>').append(dataCheckbox))
						.append($('<th>').attr('scope','row').text(count))
						.append($('<td>').text(recording.id))
						.append($('<td>').append(hyperLinkDownload))
						.append($('<td>').text(recording.content))
						.append($('<td>').text(recording.recordingType))
						.append($('<td>').text(recording.uploadTime))
						.append($('<td>').attr('class','buttons').append(radiobutton));
					mytable.append(row);
					count++;
				}

				//Dynamically inserting standalong table items
				mytable = $('table#stand-along > tbody');
				myheader = $('table#stand-along > thead');
				mytable.html('');
				myheader.html('');
				header =$('<tr>')
					.append($('<th>').attr('scope','col').text('#'))
					.append($('<th>').attr('scope','col').text('ID'))
					.append($('<th>').attr('scope','col').text('Filename'))
					.append($('<th>').attr('scope','col').text('content'))
					.append($('<th>').attr('scope','col').text('Upload Date'))
					.append($('<th>').attr('scope','col').text('Check').attr('class','buttons'));
				myheader.append(header);

				count = 1;
				for(let i = recordings.length-1; i>=0; i--){
					let recording = recordings[i];
					let checkbox = $('<input>').attr('type','checkbox').attr('name','optcheck')
						.on('click', () => {
							$.ajax(baseUrl+"/recordings/update-standalone/"+recording.id,{
								method: 'PUT',
								contentType: 'application/json'
							}).done(function(response){
								console.log(response);
								alert("table is updated");
							}).fail(function(response){
								console.log(response);
								alert("fail");
							});
						});
					if(recording.isStandalone == 1){
						checkbox.prop('checked',true);
					}
                    let filename = recording.filename.split(".")[0];
					let hyperLinkDownload = $('<a>').attr('href',baseUrl+'/download/'+recording.id).text(filename).addClass('hyperLinkDownload');
					let row =$('<tr>')
						.append($('<th>').attr('scope','row').text(count))
						.append($('<td>').text(recording.id))
						.append($('<td>').append(hyperLinkDownload))
						.append($('<td>').text(recording.content))
						.append($('<td>').text(recording.uploadTime))
						.append(checkbox)
						.append(($('<td>').attr('class','buttons').append(checkbox)));
					mytable.append(row);
					count++;
				}

				$('#downloadAll').on('click',() => {
					let checkedItems = [];
					let downloadUrl = baseUrl+ "/bulk-download?";

					$("input[name = 'dataCheck']:checked").each(function(){
						checkedItems.push(parseInt($(this).val()));
					});

                    console.log(checkedItems);
					for(let i = 0; i < checkedItems.length; i++){
						downloadUrl = downloadUrl+"&idsToDownload[]="+checkedItems[i];
						if(i !=checkedItems.length - 1 ){
							downloadUrl = downloadUrl+"&";
						}
					}
					window.open(downloadUrl);
				});

				$('#Delete').on('click',() => {
					let checkedItems = [];
					$("input[name = 'dataCheck']:checked").each(function(){
						checkedItems.push(parseInt($(this).val()));
					});
					$.post(OC.generateUrl("/apps/maputil/bulk-delete"), {
						idsToDelete : checkedItems
					}).done(function() {
						createTable();
					});
					console.log(checkedItems);
				});

		}

		function typeFilter(recordings){
			let typelist = $('#typeList');
			typelist.prop('disabled',false);
			typelist.change(function() {
                let type = typelist.val();
                let filteredRecoridngs = [];
				if(type == "word"){
                    recordings.forEach(recording => {
                    	if (recording.recordingType == "word") {
                    		filteredRecoridngs.push(recording);
                    	}
                    });
                    createTable(filteredRecoridngs);
				}else if (type == "sentence"){
                    recordings.forEach(recording => {
                        if (recording.recordingType == "sentence") {
                            filteredRecoridngs.push(recording);
                        }
                    });
                    createTable(filteredRecoridngs);
				}else if (type == "word_list"){
                    recordings.forEach(recording => {
                        if (recording.recordingType == "word list") {
                            filteredRecoridngs.push(recording);
                        }
                    });
                    createTable(filteredRecoridngs);
				}else if (type == "short_sentence"){
                    recordings.forEach(recording => {
                        if (recording.recordingType == "short sentence") {
                            filteredRecoridngs.push(recording);
                        }
                    });
                    createTable(filteredRecoridngs);
				}else if (type == "unclassified") {
                    recordings.forEach(recording => {
                        if (recording.recordingType == "unclassified") {
                            filteredRecoridngs.push(recording);
                        }
                    });
                    createTable(filteredRecoridngs);
                }else if(type == "default"){
                    createTable(recordings);
				}
			});
		}

		$('#suburblist').change(function(){
			let deferred = $.Deferred();
			let suburb = $('#suburblist').val();
			suburbchoosen = suburb;
			if (suburb != "default") {
				$.get(baseUrl+"/recordings/"+citychoosen+"/"+suburbchoosen).done(function(recordings){
					createTable(recordings);
					typeFilter(recordings);
					if(tableStatus == "R"){
                        $('div#representative').show();
                    }else if(tableStatus == "S"){
                        $('div#stand-along').show();
                    }
				}).fail(function(){
					deferred.reject();
					alert("fail to get data");
				});
			}else if(suburb == "default"){
                $('#typeList').val("default").attr('selected','selected');
                $('#typeList').prop('disabled',true);
            }
		});

		let tablinks = $('.tablinks');
		let representativeButton = $('#representativeButton');
		let standalongButton = $('#standalongButton');

		standalongButton.on('click', () => {
			let tabcontent, tablinks;
			tabcontent = $('.tabcontent');
			for (let j = 0; j < tabcontent.length; j++) {
				tabcontent[j].style.display = "none";
			}
			tablinks = $('.tablinks');
			for (let j = 0; j < tablinks.length; j++) {
				tablinks[j].className = tablinks[j].className.replace(" active", "");
			}
			$('div#stand-along').show();
			$('#standalongButton').addClass("active");
		});

		representativeButton.on('click', () => {
			let tabcontent, tablinks;
			tabcontent = $('.tabcontent');
			for (let j = 0; j < tabcontent.length; j++) {
				tabcontent[j].style.display = "none";
			}
			tablinks = $('.tablinks');
			for (let j = 0; j < tablinks.length; j++) {
				tablinks[j].className = tablinks[j].className.replace(" active", "");
			}
			$('div#representative').show();
			$('#representativeButton').addClass("active");
		});

		// this will be map to 'recording#index', the last bit is the 'url' part of the corresponding route, see routes
		let baseUrl = OC.generateUrl("/apps/maputil"); // '/recordings' is the last bit

		//sent request to controller to get city which contains recordings.
		let cities = new Citylist(baseUrl);
		cities.loadAll().done(function () {
			console.log('data retrieve success');
		}).fail(function () {
			alert('Could not load notes');
		});
	});

})(OC, jQuery);