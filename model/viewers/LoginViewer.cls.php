<?php
class LoginViewer
{
	public function getHtmlCode()
	{
		$html = "";
		
		$html .= '<div id="chatPage">';
			$html .= '<h1>Se connecter</h1>';
			$html .= '<form method="post" action="'.$_SERVER['REQUEST_URI'].'">';
				$html .= '<div class="FormElement" id="formElementOutput">';

					$html .= '<div>Usager: <input type="text" name="user" /></div>';
					$html .= '<div>Mot de passe: <input type="text" name="password" /></div>';
					
					$html .= '<div>';
						$html .= '<input class="Button" type="submit" value="Entrer" />';
					$html .= '</div>';
				
				$html .= '</div>';
				
				
			$html .= '</form>';
		$html .= '</div>';
		
		return $html;
	}
}