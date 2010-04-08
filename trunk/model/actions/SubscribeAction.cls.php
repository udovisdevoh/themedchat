<?php
class SubscribeAction extends AbstractAction
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
		
		//pw: munymuny
		$this->result = $soapClient->call('enregistrer', array('matricule' => '0171066','prenom' => 'Guillaume','nom' => 'Lacasse','nomUsager' => $_POST['user'], 'motDePasse' => md5($_POST['password'])));		
	}
	
	public function getResult()
	{
		return $this->result;
	}
}	
?>