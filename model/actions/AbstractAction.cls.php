<?php

abstract class AbstractAction
{
	//Execute l'action
	protected abstract function doAction();
	
	public function execute()
	{
		//vérifie les droits
		//todo
		
		//Fait l'action
		$this->doAction();
	}
	
	public function forward($url)
	{
		echo '<script language="Javascript">location.href="'.$url.'"</script>';
		die();
	}
}