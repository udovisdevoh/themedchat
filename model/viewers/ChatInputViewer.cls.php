<?php
class ChatInputViewer
{
	public function getHtmlCode($chatAction)
	{
		$html = "";
		
		$html .= '<div id="chatPage">';
			$html .= '<h1>Chat</h1>';
			$html .= '<form method="get" action="'.$_SERVER['REQUEST_URI'].'" onsubmit="onSendMessage();return false">';
				$html .= '<div class="FormElement" id="formElementOutput">';
					$html .= '<div class="TextOutput" id="textOutput">';					
						if (is_array($chatAction->getMessageList()))
							$html .= $this->getHtmlCodeMessageList($chatAction->getMessageList());
					$html .= '</div>';
				$html .= '</div>';
				
				$html .= '<div class="FormElement" id="formElementUserList">';
					if (is_array($chatAction->getMemberList()))
						$html .= $this->getHtmlCodeMemberList($chatAction->getMemberList());
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
		
		$html .= '<script type="text/javascript">';
		$html .= "\n";
		$html .= 'setTimeout(loadMessageList,1000);';
		$html .= "\n";
		$html .= '</script>';
		
		$menuViewer = new MenuViewer();
		$html .= $menuViewer->getHtmlCode();
		
		return $html;
	}
	
	private function getHtmlCodeMessageList($messageList)
	{
		$html = "";
		
		foreach ($messageList as $message)
		{
			$html .= '<p>';
				$html .= '<b>'.strip_tags($message['nomUsager']).':</b> ';
				$html .= '<i>'.strip_tags($message['message']).'</i> ';
			$html .= '</p>';
		}
		
		return $html;
	}
	
	private function getHtmlCodeMemberList($memberList)
	{		
		$counter = 0;
		foreach ($memberList as $member)
			$html .= strip_tags($member).'<br />';	
		return $html;
	}
}