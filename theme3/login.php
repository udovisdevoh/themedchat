<?php
	require_once('../model/AssemblyInfo.ns.php');
	$loginAction = new LoginAction();
	$loginAction->execute();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
	<head>
		<?php require_once('../model/Header.page.php');?>	
	</head>
	<body onload="main()">
		<?php
			$loginViewer = new LoginViewer();
			echo $loginViewer->getHtmlCode($loginAction);
		?>
	</body>
</html>