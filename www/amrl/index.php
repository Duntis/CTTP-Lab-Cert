<?php
require_once('C:/wamp/www/bend/pass.php');
require_once('C:/wamp/www/bend/modules/auth.php');
require_once('C:/wamp/www/bend/modules/protected.php');
require_once('C:/wamp/www/bend/modules/forms.php');
require_once('C:/wamp/www/bend/modules/input_functions.php');
?>
<!DOCTYPE>
<html>
  <head>
    <title>CTTP Calibration Application</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/css/view.css"/>
    <link rel="stylesheet" type="text/css" href="http://localhost/css/amrl.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/t/dt/jq-2.2.0,jszip-2.5.0,pdfmake-0.1.18,dt-1.10.11,af-2.1.1,b-1.1.2,b-colvis-1.1.2,b-flash-1.1.2,b-html5-1.1.2,b-print-1.1.2,cr-1.3.1,fc-3.2.1,fh-3.1.1,kt-2.1.1,r-2.0.2,rr-1.1.1,sc-1.4.1,se-1.1.2/datatables.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/t/dt/jq-2.2.0,jszip-2.5.0,pdfmake-0.1.18,dt-1.10.11,af-2.1.1,b-1.1.2,b-colvis-1.1.2,b-flash-1.1.2,b-html5-1.1.2,b-print-1.1.2,cr-1.3.1,fc-3.2.1,fh-3.1.1,kt-2.1.1,r-2.0.2,rr-1.1.1,sc-1.4.1,se-1.1.2/datatables.min.js"></script>
  </head>
  <body>
    <?php require_once('C:/wamp/www/bend/blocks/sidebar.html');?>
    <?php require_once('C:/wamp/www/bend/blocks/banner.php');?>
    <div id="container">
      <div id="containerinr">
        <?php
        if(!isset($_GET['year'])||empty($_GET['year']))
        {
        ?>
        <div class="display">
          <div class="displayheader">Select a year</div>
          <?php
          foreach($o=scandir("C:/wamp/www/bend/file_storage/AMRL Equipment Calibrations/") as $oitem)
          {
            if(strpos($oitem,'Equipment Calibrations')!==false)
            {
              $bits=explode(' Equipment Calibrations',$oitem);
              echo '<a href="http://localhost/amrl/index.php?year='.$bits[0].'">';;
                echo '<div class="displayitem">'.$bits[0].'</div>';
              echo '</a>';
            }
          }
          ?>
        </div>
        <?php
        }
        else
        {
          try
          {
            $list=[];

            $con=new PDO("mysql:host=localhost;dbname=calibration_data",$GLOBALS['user'],$GLOBALS['pass']);
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            $state=$con->prepare("SELECT * FROM `main`");
            $state->execute();
            $values=$state->fetchAll();

            if(!empty($values))
            {
              foreach($values as $data)
              {
                $main_id=$data['id'];
                $table=$data['table_number'];

                $state=$con->prepare("SELECT main_id,calibration_date FROM `$table` WHERE main_id=:main_id");
                $state->bindValue(':main_id',$main_id);
                $state->execute();
                $return=$state->fetchAll();

                if(!empty($return))
                {
                  $bits=explode('/',$return[0]['calibration_date']);
                  //[0] returns month
                  //[1] returns day
                  //[2] returns year
                  if($bits[2]===substr($_GET['year'],2))
                  {
                    array_push($list,[$return[0]['main_id'],$table]);
                  }
                }
              }
              if(!empty($list))
              {
                ?>
                <table class="list">
                  <caption><?php echo $_GET['year'];?> Calibrations</caption>
                  <tbody>
                    <tr>
                      <th>Pass/Fail</th>
                      <th>Equipment Id</th>
                      <th>Date performed</th>
                      <th>Performed By</th>
                      <th>Status</th>
                      <th>Commands</th>
                    </tr>
                    <?php
                    foreach($list as $data)
                    {
                      try
                      {
                        $main_id=$data[0];
                        $table=$data[1];

                        $con=new PDO("mysql:host=localhost;dbname=calibration_data",$GLOBALS['user'],$GLOBALS['pass']);
                        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

                        $st=$con->prepare("SELECT * FROM `$table` WHERE main_id='$main_id' ORDER BY id DESC");
                        $st->execute();
                        $sr=$st->fetchAll();

                        if(empty($sr))
                          break;
                        echo '<tr class="item">';
                        if($sr[0]['result'])
                          echo '<td class="pass">P</td>';
                        else
                          echo '<td class="fail">F</td>';
                        echo '<td>'.$sr[0]['equipment_id'].'</td>';
                        echo '<td>'.$sr[0]['calibration_date'].'</td>';
                        echo '<td>'.$sr[0]['performed_by'].'</td>';
                        if($sr[0]['display'])
                          echo '<td>Live</td>';
                        else
                          echo '<td>Deleted</td>';
                        echo '<td>';
                        echo '<a href="http://localhost/view.php?viewitem='.$main_id.'&table='.$table.'">View</a>';
                        echo '<a href="http://localhost/view.php?edititem='.$main_id.'&table='.$table.'">Edit</a>';
                        if($sr[0]['display'])
                          echo '<a href="http://localhost/view.php?removeitem='.$main_id.'&table='.$table.'">Remove</a>';
                        else
                          echo '<a href="http://localhost/view.php?undoitem='.$main_id.'&table='.$table.'">Undo</a>';
                        echo '</td>';
                        echo '</tr>';
                      }
                      catch(PDOException $e)
                      {
                          echo $e->getMessage();
                      }
                    }
                    ?>
                  </tbody>
                </table>
                <?php
              }
              else
              {
                ?>
                <div class="display">
                  <div class="displayheader">No calibrations to display for this year</div>
                </div>
                <?php
              }
            }
            else
            {

            }
          }
          catch(PDOException $e)
          {
            echo $e->getMessage();
          }
        }
        ?>
      </div>
    </div>
  </body>
</html>
