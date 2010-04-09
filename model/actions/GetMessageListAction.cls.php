<?php
class GetMessageListAction extends AbstractAction
{
	private $ajaxData;
	
	public function doAction()
	{
		$soapClient = new nusoap_client('http://b63server.notes-de-cours.com/services.php', false);
		$err = $soapClient->getError();
		if ($err)
		{
			echo "(Erreur : )" . $err;
		}
		
		$this->ajaxData = json_encode($soapClient->call('lireMessages', array('clef' => $_SESSION['chatKey'])));
	}
	
	public function getAjaxData()
	{
		return $this->ajaxData;
	}
}