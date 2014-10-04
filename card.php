<?php
    require_once 'cbreeze.php';
    require 'config.php';
    
	try {
		// Create connection to database
		$db = new cbreeze($config);
	} catch(Exception $e) {
		if($config['debug'] == 'on') {
			array_push($error,'ERROR: ' . $e->getmessage());
		}
	}
    
    // $db is the database connection
    
    
    class card {
        
        /**
         * @param: 
         * @return:
         */
        
        
        /** set format of the cards
         * @param: array $selectedelems - an array of the types of data each card will need
         * @return: void
         */
        
        /* 
        Format of the selectedelems json: NOTE: this is formatted in the JS on the client side
        {
            {
                "cardname" : "name here",
            },
            {
                "fieldname" : "title",
                "fieldtype" : "stf"
            },
            {
                "fieldname" : "notes",
                "fieldtype" : "ltf"
            },
            {
                "fieldname" : "to do date",
                "fieldtype" : "date"
            }
        }
        
        stf = short text field = smallTextField in the db
        ltf = long text field = largeTextField in the db
        date = timedate = date in the db
        
        
        */
        public function setFormat($selectedelems){
            //we will simply call makeCard on the $selectedelems json
            // However the cardname will be EXAMPLE
            // step 1: set cardname field = EXAMPLE
            // step 2: call makeCard($selectedelems)
            $jsonarray = json_decode($selectedelems, true);
            $jsonarray['cardname'] = "EXAMPLE"; //This should rename the cardname element to EXAMPLE
            $alteredjson = json_encode($jsonarray);
            makeCard($alteredjson);
        }
        
        /** makeCard: makes a new card
         * @param: $data - JSON with card data
         * @return: void
         */
        public function makeCard($data){
            
        }
        
        
        /** Change the priority of the card
         * @param: $newpriority - the new rank in the column
         * @return: void
         */
        public function changePriority($newpriority){
            
        }
        
        /** changeColumn
         * @param: $newcolumn - new column for the card
         * @return: void
         */
        public function changeColumn($newcolumn){
            
        }
        
        /** getrank
         * @param: 
         * @return: a number representing the rank/priority in the column
         */
        public function getRank(){
            
        }
        
        
    }
?>