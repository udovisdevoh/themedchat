<?php
class LogoutAction extends AbstractAction
{
	public function doAction()
	{
		session_start();
		session_destroy();
		header('Location: ./');
	}
}	
?>