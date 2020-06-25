<?php
	function getFooter($name) {
		return '<footer class="footer">
		  <div class="container">
			<span class="text-muted">'.date("Y").' &copy; by '.$name.'</span>
		  </div>
		</footer>
		<script src="js/jquery-3.3.1.slim.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		';
	}
?>