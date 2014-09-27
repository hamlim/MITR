<?php
	define('DATABASE_CONNECTION_ERROR', "Not connected to the database");
    define('USER_NOT_FOUND', "User is not found in the database");
	
    class cbreeze {
        private $conn = NULL;
        private $config = NULL;

        //Construct  the link to the db
        public function __construct($configArray) {
            $this->config = $configArray;
            $this->connect();
            $this->init();
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
                    $this->conn->exec("CREATE TABLE IF NOT EXISTS users (
                        username VARCHAR(32) PRIMARY KEY NOT NULL,
                        password VARCHAR(64) NOT NULL,
                        salt VARCHAR(64) NOT NULL,
                        name VARCHAR(32),
                        email VARCHAR(32),
                        isAdmin TINYINT NOT NULL,
                        userID INT NOT NULL AUTO_INCREMENT
                        ) COLLATE utf8_unicode_ci");
                    $this->conn->exec("CREATE TABLE IF NOT EXISTS cards (
                        cardID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                        smallTextField MEDIUMTEXT,
                        largeTextField MEDIUMTEXT,
                        date MEDIUMTEXT,
                        colorCode VARCHAR(10),
                        priority INT,
                        columnIDFK INT NOT NULL,
                        FOREIGN KEY(columnIDFK) REFERENCES columns(columnID),
                        commentIDFK INT NOT NULL,
                        FOREIGN KEY(commentIDFK) REFERENCES comments(commentID)
                        ) COLLATE utf8_unicode_ci");
                    $this->conn->exec("CREATE TABLE IF NOT EXISTS comments (
                        commentName VARCHAR(32) NOT NULL,
                        commentUsername VARCHAR(32) NOT NULL,
                        commentID INT NOT NULL,
                        commentContent VARCHAR(100) NOT NULL,
                        cardIDFK INT NOT NULL,
                        FOREIGN KEY(cardIDFK) REFERENCES cards(cardID)
                        ) COLLATE utf8_unicode_ci");
                    $this->conn->exec("CREATE TABLE IF NOT EXISTS columns (
                        columnName VARCHAR(32) NOT NULL,
                        columnID INT NOT NULL AUTO_INCREMENT,
                        columnOrder TINYINT NOT NULL
                        ) COLLATE utf8_unicode_ci");
                    $this->conn->exec("CREATE TABLE IF NOT EXISTS activities (
                        actionID INT NOT NULL, AUTO_INCREMENT,
                        actionContent VARCHAR(32) NOT NULL,
                        usernameFK VARCHAR(32) NOT NULL,
                        FOREIGN KEY(usernameFK) REFERENCES users(username),
                        timestamp DATETIME
                        ) COLLATE utf8_unicode_ci");
                                        
                } catch (PDOException $e){
                    if ($this->config['debug'] == 'on'){
                        echo 'ERROR: ' . $e->getmessage();
                    } else {
                        throw $e;
                    }
                }
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /**
         * Now we get into the meat of the code. here we will do all the requisite function calls.
         * @param: $uname: username of the desired user to access
         * @return: the query result
         */
        public function getUserByUsername($uname){
            if($this->conn != NULL){
                $query = $this->conn->prepare("SELECT * FROM `users` WHERE `username`='$uname' LIMIT 1");
                $query->execute();
                if($query){
                    return $query->fetch();
                } else {
                    throw new Exception(USER_NOT_FOUND);
                }
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /**
         * @param: 
         * @return:
         */
        
        /** Get the salt from the db
         * @param: $uname: username of desied salt
         * @return: the query result
         */
        
        public function getSaltByUsername($uname){
            if($this->conn != NULL){
                try {
                    $salt = $this->conn->query("SELECT salt FROM `users` WHERE `username`='$uname' LIMIT 1");
                    return $salt;
                } catch(PDOException $e) {
                    if($this->config['debug'] == 'on'){
                        cho 'ERROR: ' . $e->getmessage();
                    } else {
                        throw $e;
                    }
                }
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /** add user
         * @param: email
         * @return: N/A
         */
        



?>