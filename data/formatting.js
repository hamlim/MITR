/*

-----------------------------------------------------------
            JSON data Formatting
-----------------------------------------------------------



-----------------------------------------------------------
            CARDS
-----------------------------------------------------------

{
    {
        "info": {
            "cardname": "card one",
            "cardpriority": 1,
            "cardcolorcode": "Red",
            "cardID": 1,
            "columnID" : 1
        },
        "ltf-fields": [
            {
                "fieldname": "Notes",
                "fieldtype": "ltf",
                "fielddata": "Here are some notes."
            },
            {
                "fieldname": "another field",
                "fieldtype": "ltf",
                "fielddata": "Here is some more long content"
            }
        ],
        "stf-fields": [
            {
                "fieldname": "Description",
                "fieldtype": "stf",
                "fielddata": "About this project."
            },
            {
                "fieldname": "primary contact",
                "fieldtype": "stf",
                "fielddata": "Steve"
            }
        ],
        "date-fields": [
            {
                "fieldname": "project start",
                "fieldtype": "date",
                "fielddata": 1414880770
            }
        ],
        "activities": [
            {
                "username": "Matt Hamlin",
                "actiontype": "Made Card",
                "timestamp": 1414880770,
                "newdata": null,
                "olddata": null,
                "actionID": 1
            },
            {
                "username": "Matt Hamlin",
                "actiontype": "Edit Card",
                "timestamp": 1414880770,
                "newdata": null,
                "olddata": null,
                "actionID": 2
            },
            {
                "username": "Matt Hamlin",
                "actiontype": "Comment",
                "timestamp" : 1414880770,
                "newdata": "This card is cool!",
                "olddata": null,
                "actionID": 3,
                "parent-actionID": null
            },
            {
                "username": "Matt Hamlin",
                "actiontype": "Comment",
                "timestamp": 1414880780,
                "newdata": "This comment is cool!",
                "actionID": 4,
                "parent-actionID": 3
            }
        ]
    }
}


-----------------------------------------------------------
            USERS
-----------------------------------------------------------
[
    {
        "username" : "matt hamlin",
        "userID" : 1,
        "useremail" : "hamlim@outlook.com",
        "columncolor" : "Red",
        "isAdmin" : 1,
        "password" : "test"
    },
    {
        "username" : "Bob The-Builder",
        "userID" : 2,
        "useremail" : "bob_thebuilder@bob.bob",
        "columncolor" : "Yellow",
        "isAdmin" : 0,
        "password" : "builder123"
    }
]

-----------------------------------------------------------
            Columns
-----------------------------------------------------------
[
    {
        "columnname": "Jim",
        "columnID": 1,
        "columnorder": 75
    },
    {
        "columnname": "Atticus",
        "columnID": 2,
        "columnorder": 46
    }
]
-----------------------------------------------------------
-----------------------------------------------------------
            







*/