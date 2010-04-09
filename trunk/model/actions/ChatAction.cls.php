<?php
class ChatAction extends AbstractAction
{
	private $memberList;
	
	private $messageList;
	
	public function doAction()
	{
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err)
		{
			echo "(Erreur : )" . $err;
		}
		
		sleep(1);
		
		$this->memberList = $soapClient->call('listeDesMembres', array('clef' => $_SESSION['chatKey']));		
		
		sleep(1);
		
		$this->messageList = $soapClient->call('lireMessages', array('clef' => $_SESSION['chatKey']));
		
		if ($_POST['inputText'])
		{
			sleep(1);
			$_POST['inputText'] = strip_tags($_POST['inputText']);
			$soapClient->call('ecrireMessage', array('clef' => $_SESSION['chatKey'],'message' => stripslashes($_POST['inputText'])));
		}
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