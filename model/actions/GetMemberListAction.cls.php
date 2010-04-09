<?php
class GetMemberListAction extends AbstractAction
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
		
		sleep(1);
		
		$this->ajaxData = json_encode($soapClient->call('listeDesMembres', array('clef' => $_SESSION['chatKey'])));
	}
	
	public function getAjaxData()
	{
		return $this->ajaxData;
	}
}