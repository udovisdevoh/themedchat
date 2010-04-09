<?php
class ChatAction extends AbstractAction
{
	private $memberList;
	
	private $messageList;
	
	public function doAction()
	{
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err) {
			echo "(Erreur : )" . $err;
		}
		
		$this->memberList = $soapClient->call('listeDesMembres', array('clef' => $_SESSION['chatKey']));		
		$this->messageList = $soapClient->call('lireMessages', array('clef' => $_SESSION['chatKey']));		
	}
	
	public function getMemberList()
	{
		return $this->memberList;
	}
	
	public function getMessageList()
	{
		return $this->messageList;
	}
}	
?>