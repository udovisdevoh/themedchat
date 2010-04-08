<?php
class LogoutAction extends AbstractAction
{
	public function doAction()
	{
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err) {
			echo "(Erreur : )" . $err;
		}
		
		$this->result = $soapClient->call('deconnecter', array('clef' => $_SESSION['chatKey']));				
	
		session_destroy();
		header('Location: ./');
	}
}	
?>