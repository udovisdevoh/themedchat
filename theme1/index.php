<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
	<head>
		<?php require_once('../model/HeaderAndAssemblyInfo.ns.php');?>
	</head>
	<body onload="main()">
		<div id="chatPage">
			<h1>Chat</h1>			
			<form method="post" action="<?php echo $_SERVER['REQUEST_URI']?>">
				<div class="FormElement" id="formElementOutput">
					<div class="TextOutput">
					</div>
				</div>
				
				<div class="FormElement" id="formElementUserList"></div>
				
				<div class="Clear"></div>
				
				<div class="FormElement" id="formElementInput">
					<input class="Field" name="inputText" id="inputText" type="text" />
				</div>
				
				<div class="FormElement" id="formElementSubmit">
					<input class="Button" type="submit" value="Envoyer" />
				</div>
			</form>
		</div>
	</body>
</html>
