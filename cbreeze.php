<?php
	define('DATABASE_CONNECTION_ERROR', "Not connected to the database");
	
class cbreeze {
	private $conn = NULL;
	private $config = NULL;
	
	//Construct  the link to the db
	public function __construct($configArray) {
		$this->config = $configArray;
		$this->connect();
		$this->initialization();
	}
	
	//handle the connection
	public function connect() {
		try {
			$this->conn = new PDO('mysql:host='.$this->config['host'],$this->config['db_username'], $this->config['db_password']);
		} catch(PDOException $e) {
			if ($this->config['debug'] == 'on') {
				echo 'ERROR: ' . $e.getmessage();
			} else {
				throw $e;
			}
		}
	}
	
	//allow the connection to be closed to the db
	public function close() {
		$this->conn = null;
	}
	
	//setup the db and tables if they do not already exist
	public function init() {
		if ($this->conn != NULL) {
			try {
				//setup the db
				$this->conn->query("CREATE DATABASE IF NOT EXISTS " . $this->config['db_name'] . $this->config['db_version'] . " DEFAULT COLLATE utf8_unicode_ci");
				$this->conn->query("USE " . $this->config['db_name'] . $this->config['db_version']);
				//now we implement the tables that we will use, refer to the main documentation on draftin
				
			}
		}
	}
}



?>