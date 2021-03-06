<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>-->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<div class="container">
	<div class="filter-bar bg-light">
		<div id="filter">
			<h1>Filter</h1>
		</div>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-6 city">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<label class="input-group-text" for="citylist">@City</label>
					</div>
					<select class="custom-select" id="citylist">
						<option selected value = "default">Choose...</option>
					</select>
				</div>
			</div>
			<div class="col-lg-6 col-md-6 col-sm-6 suburb">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<label class="input-group-text" for="suburblist">@Suburb</label>
					</div>
					<select class="custom-select" id="suburblist" disabled>
						<option selected value = "default">Choose...</option>
					</select>
				</div>
			</div>
		</div>
		<div class="row" >
			<div class="col-lg-6 col-md-6 col-sm-6 city">
				<div class="input-group mb-3">
					<div class="input-group-prepend">
						<label class="input-group-text" for="typeList">@Type</label>
					</div>
					<select class="custom-select" id="typeList" disabled>
						<option selected value = "default">Choose...</option>
						<option value = "word">word</option>
						<option value = "sentence">sentence</option>
						<option value = "word_list">word list</option>
						<option value = "short_sentence">short sentence</option>
						<option value = "unclassified">unclassified</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="data-content">
		<div class="tab">
			<button class="tablinks active" id="representativeButton">Representative</button>
			<button class="tablinks" id="standalongButton">Standalong</button>
			<div class="downloadAll"><button class="fa fa-download" id="downloadAll"></button></div>
			<div class="Delete"><button class="fa fa-trash" id="Delete"></button></div>
		</div>
			<div class="tab-content tabcontent" id="representative">
				<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
					<div class="table-responsive">
						<table class="table table-hover" id="representative">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div class="tabcontent tab-content" id="stand-along">
				<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
					<div class="table-responsive">
						<table class="table table-hover" id="stand-along">
							<thead>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
	</div>
</div>