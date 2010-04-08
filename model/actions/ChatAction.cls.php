<?php
class ChatAction extends AbstractAction
{
	private $memberList;
	
	public function doAction()
	{
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err) {
			echo "(Erreur : )" . $err;
		}
		
		$this->memberList = $soapClient->call('listeDesMembres', array('clef' => $_SESSION['chatKey']));		
	}
	
	public function getMemberList()
	{
		return $this->memberList;
	}
}	
?>