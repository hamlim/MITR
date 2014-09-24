<?php
  if ($_POST) {
    $commentName = $_POST['name'];
    $commentname = mysql_real_escape_string($commentName);
    $commentUsername = $_POST['username'];
    $commentUsername = mysql_real_escape_string($commentUsername);
    $commentContent = $_POST['content'];
    $commentContent = mysql_real_escape_string($commentContent);
    $cardId = $_POST['cardid']; 
    $cardId = mysql_real_escape_string($cardId);
    mysql_query("insert into comments(commentName,commentUsername,commentContent) values ('$commentName','$commentUsername','$commentContent','$cardId')");
  }
?>

<li class="box">
<?php echo $commentName;?><br />
<?php echo $commentContent; ?>
</li>
