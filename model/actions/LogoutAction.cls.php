<?php
class LogoutAction extends AbstractAction
{
	public function doAction()
	{
		session_destroy();
		header('Location: ./');
	}
}	
?>