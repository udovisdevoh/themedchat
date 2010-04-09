<?php
	require_once('../AssemblyInfo.ns.php');
	if ($_GET['inputText'])
	{
		sleep(1);
		$_GET['inputText'] = urldecode($_GET['inputText']);
		$_GET['inputText'] = strip_tags($_GET['inputText']);
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err)
		{
			echo "(Erreur : )" . $err;
		}
		
		echo "Key: ".$_SESSION['chatKey'].'<br/>';
		
		$result = $soapClient->call('ecrireMessage', array('clef' => $_SESSION['chatKey'],'message' => stripslashes($_GET['inputText'])));
		echo "Result: ".$result.'<br/>';
	}
?>