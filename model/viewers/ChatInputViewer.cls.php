<?php
class ChatInputViewer
{
	public function getHtmlCode($chatAction)
	{
		$html = "";
		
		$html .= '<div id="chatPage">';
			$html .= '<h1>Chat</h1>';
			$html .= '<form method="post" action="'.$_SERVER['REQUEST_URI'].'">';
				$html .= '<div class="FormElement" id="formElementOutput">';
					$html .= '<div class="TextOutput">';					
						if (is_array($chatAction->getMessageList()))
							$html .= $this->getHtmlCodeMessageList($chatAction->getMessageList());
					$html .= '</div>';
				$html .= '</div>';
				
				$html .= '<div class="FormElement" id="formElementUserList">';
					if (is_array($chatAction->getMemberList()))
						$html .= implode('<br/>',$chatAction->getMemberList());
				$html .= '</div>';
				
				$html .= '<div class="Clear"></div>';
				
				$html .= '<div class="FormElement" id="formElementInput">';
					$html .= '<input class="Field" name="inputText" id="inputText" type="text" />';
				$html .= '</div>';
				
				$html .= '<div class="FormElement" id="formElementSubmit">';
					$html .= '<input class="Button" type="submit" value="Envoyer" />';
				$html .= '</div>';
			$html .= '</form>';
		$html .= '</div>';
		
		$menuViewer = new MenuViewer();
		$html .= $menuViewer->getHtmlCode();
		
		return $html;
	}
	
	public function getHtmlCodeMessageList($messageList)
	{
		$html = "";
		
		foreach ($messageList as $message)
		{
			$html .= '<p>';
				$html .= '<b>'.$message['nomUsager'].':</b> ';
				$html .= '<i>'.$message['message'].'</i> ';
			$html .= '</p>';
		}
		
		return $html;
	}
}