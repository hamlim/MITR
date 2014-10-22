<?php
	define('DATABASE_CONNECTION_ERROR', "Not connected to the database");
	define('USER_CREATION_ERROR', "User could not be created");
	define('USER_NOT_FOUND_ERROR', "User could not be found");
	define('USER_NOT_DELTED_ERROR', "User could not be deleted");
	define('SALT_NOT_FOUND_ERROR', "Salt could not be found");
    define('CARD_CREATION_ERROR', "Card could not be created");
	
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
                        cardName VARCHAR(32) NOT NULL,
                        smallTextField MEDIUMTEXT,
                        largeTextField MEDIUMTEXT,
                        dateField MEDIUMTEXT,
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
                        actionContent MEDIUMTEXT NOT NULL,
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
        
        public function addUser($email, $password = "seamonkey"){
            if($this->conn != NULL){
                try {
                    $salt = $this->createSalt();
                    $hash = $this->hashPassword($password, $salt);
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
        
        
        /* 
        
        Card functionality:
        ------------------------------------------------------
        
        Format of selectedelems json: NOTE: this is formatted in the JS on the client side
        {
            "info": {
                    "cardname" : "name here",
                    "priority" : 0,
                    "colorcode": "red",
                    "cardID"   : 123456
            },
            "ltf-fields": [
                {
                    "fieldname" : "notes",
                    "fieldtype" : "ltf",
                    "fielddata" : "..."
                }
            ],
            "stf-fields": [
                {   
                    "fieldname" : "title",
                    "fieldtype" : "stf",
                    "fielddata" : "..."
                },
                {
                    "fieldname" : "primary contact",
                    "fieldtype" : "stf",
                    "fielddata" : "steve rich"
                }
            ],
            "date-fields": [
                {
                    "fieldname" : "to do date",
                    "fieldtype" : "date",
                    "fielddata" : datetime obj.
                }
            ],
        }
        
        stf = short text field = smallTextField in the db
        ltf = long text field = largeTextField in the db
        date = timedate = date in the db
        
        
        */
        /**
         * @param: 
         * @return:
         */
        public function setFormat($selectedelems){
            $jsonarray = json_decode($selectedelems, true);
            $jsonarray['info']['cardname'] = "EXAMPLE";
            $altarray = json_encode($jsonarray);
            makeCard($altarray);
        }
        
        /**
         * @param: 
         * @return:
         */
        public function getFormat(){
            if ($this->conn != NULL){
                //get the example card data
				$query = $this->conn->prepare("SELECT * FROM cards WHERE `cardName`='EXAMPLE' LIMIT 1");
                $query->execute(); //execute the query

				$s = $query->fetch(); //collect what the db returns
                //$s['cardName'] == EXAMPLE
                
                $returnarr();
                //we need to know the number of ltf's, stf's, and dates
                $numofltf = 0;
                $numofstf = 0;
                $numofdate = 0;
                //make an array of ltf field names after
                foreach ($s['ltf-fields'] as $elems){
                    $numofltf = $numofltf + 1;
                }
                if ($numofltf != 0){
                    $ltfarr();
                    for ($i = 0; i<$numofltf; ++$i){
                        $ltfarr[] = $s['ltf-fields'][i]['fieldname'];
                    }
                    $returnarr['ltf'] = $ltfarr;
                }
                //make an array of stf field names after
                foreach ($s['stf-fields'] as $elems){
                    $numofstf = $numofstf + 1;
                }
                if ($numofstf != 0){
                    $stfarr();
                    for ($i = 0; i<$numofstf; ++$i){
                        $stfarr[] = $s['stf-fields'][i]['fieldname'];
                    }
                    $returnarr['stf'] = $stfarr;
                }
                //make an array of date field names after
                foreach ($s['date-fields'] as $elems){
                    $numofdate = $numofdate + 1;
                }
                if ($numofdate != 0){
                    $datearr();
                    for ($i = 0; i<$numofdate; ++$i){
                        $datearr[] = $s['date-fields'][i]['fieldname'];
                    }
                    $returnarr['date'] = $datearr;
                }
                
                $jsonreturn = json_encode($returnarr);
                return $jsonreturn;
            } else {
        		throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /*
        getFormat json return format:
        
        "ltf": [
            "onefieldname",
            "anotherfieldname"
        ],
        "stf": [
            "onefieldname",
            "anotherfieldname",
            "yetanotherfieldname"
        ],
        "date": [
            "onedatefieldname"
        ]
        
        
        */
        
            
            
        /**
         * @param: $data a json of the card info from the frontend
         * @return: null
         */
        public function makeCard($data){
            //first we need to decode the data
            $dataarray = json_decode($data, true);
            //first we define the example card
            if ($this->conn != NULL){
                /* 
                basic notes:
                
                1. we initialize the column to the first column
                2. we initialize the priority to 0
                3. we initialize the colorcode to null
                
                */
                $cardname = $dataarray['info']['cardname'];
                $priority = 0;
                $colorcode = "null";
                $ltf = $dataarray['ltf-fields'];
                $ltfstring = json_encode($ltf);
                $stf = $dataarray['stf-fields'];
                $stfstring = json_encode($stf);
                $date = $dataarray['date-fields'];
                $datestring = json_encode($date);
                
                try {
                    if ($this->conn->exec("INSERT INTO `cards` (
						`cardName`, `priority`, `colorCode`, `smallTextField`, `largeTextField`, `dateField`) VALUES (
						'$cardname', '$priority', '$colorcode', '$stfstring', '$ltfstring', '$datestring');") != 0) {
					} else {
						throw new Exception(CARD_CREATION_ERROR);
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
        
        /**
         * @param: $newpriority int generated by the frontend of the new priority, $cardname - name of the card that changed
         * @return: null
         */
        public function changePriority($newpriority, $cardname){
            //we need to simply change the priority in the db
            if ($this->conn != NULL) {
				$query = $this->conn->prepare("UPDATE `cards` SET `priority`='$newpriority' WHERE `cardName`='$cardname'");
				$query->execute();
                //call addActivity function here
                
			} else {
				throw new Exception(DATABASE_CONNECTION_ERROR);
			}
        }
        
        /**
         * @param:  $cardname of the card, $newcolumnID - column to where the card is moved to
         * @return: null
         */
        public function changeColumn($cardname, $newcolumnID){
            if ($this->conn != NULL) {
                //simply update the columnID for the card
				$query = $this->conn->prepare("UPDATE `cards` SET `columnIDFK`='$newcolumnID' WHERE `cardName`='$cardname'");
				$query->execute();
                
                //call addActivity function here
                
			} else {
				throw new Exception(DATABASE_CONNECTION_ERROR);
			}
        }
                
        /**
         * @param: null
         * @return: JSON array of columns in order with their information
         */
        public function getColumns(){
            $returnarr = []; //initialize the return array
            if( $this->conn != NULL){
                //we are connected to the db
                $query = $this->conn->prepare("SELECT * FROM `columns`");
                
                $query->execute();
                
                $data = $query->fetch();
                // $data is an array
                //i need to format the array into a JSON array
                
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /**
         * @param: $cardID - the CardID
         * @return: json array of the card
         */
        public function getCard($cardID){
            if( $this->conn != NULL){
                //we are connected to the db
                $query = $this->conn->prepare("SELECT * FROM `cards` WHERE `cardID`='$cardID'");
                $query->execute();
                $carddat = $query->fetch();
                
                //carddat is an array of all the card data, now to just format it properly
                
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        /**
         * @param: $columnID - the ID of the column
         * @return: JSON array of the individual cards all in the column given
         */
        public function getCards($columnID){
            if( $this->conn != NULL){
                //we are connected to the db
                //select all cards where columnidfk = $columnID
                $query = $this->conn->prepare("SELECT `cardID` FROM `cards` WHERE `columnIDFK`='$columnID'");
                $query->execute();
                
                $cards = $query->fetch();
                
                //$cards is an array of all card id's in the column stated
                
                
            } else {
                throw new Exception(DATABASE_CONNECTION_ERROR);
            }
        }
        
        
        
        
        
        
        /* 
        Managerial Functionality:
        -----------------------------------------
        
        */
        
        public function editColumnColor($colorcode){
            
        }
    }


?>