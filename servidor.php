<?php

extract($_POST);

switch ($funcao) {
	case 'localizar':
		if(isset($device_id)){
			try{
				$account_id = "<< ACCOUNT_ID >>";
				$secret_key = "<< SECRET_KEY >>";
				$basicAuth = "Basic " . base64_encode($account_id . ':' . $secret_key);
				$ch = curl_init("https://v3.api.hypertrack.com/devices/$device_id");
				curl_setopt_array($ch, [
				CURLOPT_CUSTOMREQUEST => 'GET',
				CURLOPT_HTTPHEADER => [
				    "Authorization: {$basicAuth}"
				],
				CURLOPT_RETURNTRANSFER => 1,
				]);
				$resposta = curl_exec($ch);

				if(!$resposta){
					throw new Exception('Request Error:' . curl_error($ch));
				}
				curl_close($ch);

				$resposta = json_decode($resposta, true);
				$latitude = $resposta['location']["geometry"]["coordinates"][0];
				$longitude = $resposta['location']["geometry"]["coordinates"][1];

				die(json_encode(["success" => true, "latitude" => $latitude, "longitude" => $longitude]));

			}catch(Exception $e){

				die(json_encode(["success" => false, "error" => $e->getMessage()]));
			}
		}
	break;
}

