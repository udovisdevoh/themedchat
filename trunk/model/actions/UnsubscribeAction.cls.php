<?php
class UnsubscribeAction extends AbstractAction
{
	private $result = "";
	
	public function doAction()
	{
		if (!$_POST['matricule'])
			return;
			
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err) {
			echo "(Erreur : )" . $err;
		}
		
		$this->result = $soapClient->call('desenregistrer', array('matricule' => $_POST['matricule']));		
	}
	
	public function getResult()
	{
		return $this->result;
	}
}	
?>