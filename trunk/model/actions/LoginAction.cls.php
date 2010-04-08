<?php
class LoginAction extends AbstractAction
{
	private $result = "";

	public function doAction()
	{
		if (!$_POST['user'] || !$_POST['password'])
			return;
			
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err) {
			echo "(Erreur : )" . $err;
		}
		
		$this->result = $soapClient->call('connecter', array('nomUsager' => $_POST['user'], 'motDePasse' => md5($_POST['password'])));		
		
		$_SESSION['chatKey'] = $this->result;
	}
	
	public function getResult()
	{
		return $this->result;
	}
}	
?>