<?php include_once './php/includes/head.php'; ?>
<body>
    <div class="header2 bg-success-gradiant">
        <div >
            <?php include_once './php/includes/navbar.php'; ?>
        </div>
    </div>
    
    <!--Site Content goes here -->
    
    <div class="container" style="height:100vh;">
        
        <div class="row ">
            
            <div class="col-md-12">
 
            </div>
                <div class="col-md-12">
     
            </div>
            
            <main role="main" class="container text-center">
<h2>Räume</h2>
<hr>
<div id="cards">

</div>
<hr>
<i class="fa fa-plus" style="background-color:#51a9ff; float:right; margin-top:-10px;margin-right:-20px;" data-toggle="modal" data-target="#roomModal"></i>
</main>

<div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="roomModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Raum Erstellen</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="form-group">
        <input type="text" placeholder="Raum Name" maxlength="20" id="raum_name" class="form-control">
		</div>
		<div class="form-group">
        <input type="text" placeholder="Raum Beschreibung" id="raum_beschreibung" class="form-control">
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
		<button type="button" class="btn btn-primary" onclick="createRoom();" data-dismiss="modal">Erstellen</button>
      </div>
    </div>
  </div>
</div>
            

         
        </div>
    </div>
<?php include_once './php/includes/footer.php'; ?>
</body>

<?php include_once './php/includes/scripts.php';?>
<script src="assets/js/multiraum.js"></script>