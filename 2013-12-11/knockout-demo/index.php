<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Knockout Sample Page</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
</head>
<body>

	<div id="viewApp">
		<div class="container">
			<div class="page-header">
				<h1>Knockout.js Functionality Demos <small>Knockout 3.0</small></h1>
			</div>
			
			<div class="row">
				<div class="col-md-12">
					<form class="form-horizontal" action="#">
						<div class="form-group">
							<label class="col-md-2 control-label">Range Validator</label>
							<div class="col-md-3">
								<input type="text" class="form-control" data-bind="value: sampleInput">
								<p class="help-block">Accepted range is 2 - 28</p>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">Modified Range Validator</label>
							<div class="col-md-3">
								<input type="text" class="form-control" data-bind="value: sampleInputModify">
								<p class="help-block">Adds 20 to the value of the range validator observable</p>
							</div>
						</div>
						<hr>
						<div class="form-group">
							<label class="col-md-2 control-label">First Name:</label>
							<div class="col-md-3">
								<input type="text" class="form-control" data-bind="value: firstName">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">Last Name:</label>
							<div class="col-md-3">
								<input type="text" class="form-control" data-bind="value: lastName">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">Full Name:</label>
							<div class="col-md-3">
								<input type="text" class="form-control" data-bind="value: fullName">
							</div>
						</div>
					</form>
				</div>
			</div>
			<hr>
			<div class="row">
				<div class="col-md-12">
					<form class="form-horizontal" action="#">
						<div class="form-group">
							<label class="col-md-2 control-label">Progress Bar Value</label>
							<div class="col-md-3">
								<div class="input-group">
									<input type="text" class="form-control" data-bind="value: progressPercent">
									<span class="input-group-addon">%</span>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="col-md-6 col-md-offset-2">
					<div data-bind="progressBar: progressPercent, barType: 'warning'"></div>
				</div>
			</div>
			<hr>
			<h2>Display JSON Data <small>(with and without mapping)</small></h2>
			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Post ID</th>
						<th>Title</th>
						<th>Content</th>
						<th>Permalink</th>
						<th>Categories</th>
					</tr>
				</thead>
				<tbody data-bind="foreach: posts">
					<tr>
						<td data-bind="text: id"></td>
						<td data-bind="text: title"></td>
						<td data-bind="shortenText: content, outputLength: 500"></td>
						<td><a data-bind="attr: { href: permalink, target: '_blank' }, text: permalink"></td>
						<td>
							<ul data-bind="foreach: categories">
								<li data-bind="text: $data"></li>
							</ul>
						</td>
						<!-- <td data-bind="html: content"></td> -->
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="js/vendor/knockout-3.0.0.js"></script>
<script src="js/vendor/knockout.mapping-latest.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="js/src/scripts.js"></script>
</body>
</html>