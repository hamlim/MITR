<?php
	define('DATABASE_CONNECTION_ERROR', "Not connected to the database");
	define('USER_CREATION_ERROR', "User could not be created");
	define('USER_NOT_FOUND_ERROR' , "User could not be found");
	define('USER_NOT_DELTED_ERROR' , "User could not be deleted");
	define('SALT_NOT_FOUND_ERROR' , "Salt could not be found");
	
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
                        password VARCHAR(64) NOT NULL,
                        salt VARCHAR(64) NOT NULL,
                        name VARCHAR(32),
                        email VARCHAR(32) NOT NULL,
                        isAdmin TINYINT NOT NULL,
                        userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY
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
         * @param: $email: email of the desired user to access
         * @return: the query result
         */
        public function getUserByEmail($email){
            if($this->conn != NULL){
                $query = $this->conn->prepare("SELECT * FROM `users` WHERE `email`='$email' LIMIT 1");
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
         * @param: $email: email of desied salt
         * @return: the query result
         */
        
        public function getSaltByEmail($email){
            if($this->conn != NULL){
                try {
                    $salt = $this->conn->query("SELECT salt FROM `users` WHERE `email`='$email' LIMIT 1");
                    return $salt;
                } catch(PDOException $e) {
                    if($this->config['debug'] == 'on'){
                        echo 'ERROR: ' . $e->getmessage();
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
        
        public function addUser($email){
            if($this->conn != NULL){
                try {
                    $temppassword = "cbreeze";
                    $salt = $this->createSalt();
                    $hash = $this->hashPassword($temppassword, $salt);
                    if ($this->conn->exec("INSERT INTO `users` (
						`email`, `password`, `salt`) VALUES (
						'$email', '$hash', '$salt');") != 0) {
					} else {
						throw new Exception(USER_CREATION_ERROR);
					}
                } catch(PDOException $e) {
                    if ($this->config['debug'] == 'on') {
						echo 'ERROR: ' . $e->getmessage();
					} else {
						throw $e;
					}
                }
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /** Hashes the plaintext passord with the given salt
		  * @param $password - as a plaintext string
		  * @param - $salt Blowfish salt 
		  * @return - the hashed password
		  */
		private function hashPassword($password, $salt) {
			return crypt($password, $salt);
		}
        
        /** Creates a random salt compatible with Blowfish hashing
		  * @return - new random salt
		  */
		private function createSalt($rounds = 7) {
	
		    $salt = "";
		    $salt_chars = array_merge(range('A','Z'), range('a','z'), range(0,9));
		    for($i=0; $i < 22; $i++) {
		      $salt .= $salt_chars[array_rand($salt_chars)];
		    }
		    return sprintf('$2a$%02d$', $rounds) . $salt;
		}
        
        /** Verifies that the user is in the database and that the provided password is correct
		  * @param $email - email to check 
		  * @param $password - Plaintext password to check
		  * @return boolean of verification state
		  */
		public function verifyUser($email, $password) {
			if ($this->conn != NULL) {
				$query = $this->conn->prepare("SELECT salt FROM `users` WHERE email='$email'");
				$query->execute();

				$s = $query->fetch();
				$salt = $s['salt'];

				if (isset($salt)) {
					foreach ($this->conn->query("SELECT * FROM `users` WHERE email='$email'") as $return) {
						$hashPassword = $return['password'];
					}
					if (isset($hashPassword)) {
						$newhashPassword = $this->hashPassword($password, $salt);
						if ($newhashPassword == $hashPassword) {
							return true;
						} else {
							return false;
						}
					} else {
						throw new Exception(USER_NOT_FOUND_ERROR);
					}
				} else {
					throw new Exception(SALT_NOT_FOUND_ERROR);
				}
			} else {
				throw new Exception(DATABASE_CONNECTION_ERROR);
			}
		}
        
        /** Changes the user's password
		  * @param $email - email of the user
		  * @param $password - The new password for the user
		  */
		public function updatePassword($email, $pass) {
			if ($this->conn != NULL) {
                $salt = $this->createSalt();
                $hash = $this->hashPassword($pass, $salt);
				$query = $this->conn->prepare("UPDATE `users` SET `password`='$hash' WHERE `email`='$email'");
				$query->execute();
			} else {
				throw new Exception(DATABASE_CONNECTION_ERROR);
			}	
		}

		/** Changes the user's name
		  * @param $email - email of the user
		  * @param $name - The new name for the user
		  */
		public function updateName($email, $name) {
			if ($this->conn != NULL) {
				$query = $this->conn->prepare("UPDATE `users` SET `name`='$name' WHERE `email`='$email'");
				$query->execute();
			} else {
				throw new Exception(DATABASE_CONNECTION_ERROR);
			}	
		}
        
        
    }


?>