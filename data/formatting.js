/*

-----------------------------------------------------------
            JSON data Formatting
-----------------------------------------------------------



-----------------------------------------------------------
            CARDS
-----------------------------------------------------------

{
    {
        "info" : {
            "cardname" : "card name",
            "cardpriority" : 1,
            "cardcolorcode" : "red",
            "cardID" : 1
        },
        "ltf-fields" : [
            {
                "fieldname" : "Notes",
                "fieldtype" : "ltf",
                "fielddata" : "Here are some notes."
            },
            {
                "fieldname" : "another field",
                "fieldtype" : "ltf",
                "fielddata" : "Here is some more long content"
            }
        ],
        "stf-fields" : [
            {
                "fieldname" : "Client name",
                "fieldtype" : "stf",
                "fielddata" : "Acme Corp."
            },
            {
                "fieldname" : "primary contact",
                "fieldtype" : "stf",
                "fielddata" : "Steve"
            }
        ],
        "date-fields" : [
            {
                "fieldname" : "project start",
                "fieldtype" : "date",
                "fielddata" : 011114-03:14
            }
        ],
        "activities" : {
            {
                "username" : "Matt Hamlin",
                "actiontype" : "Made Card",
                "timestamp" : 1414880770,
                "newdata" : (JSON here),
                "olddata" : (JSON here),
                "actionID" : 1
            },
            {
                "username" : "Matt Hamlin",
                "actiontype" : "Edit Card",
                "timestamp" : 1414880770,
                "newdata" : (JSON here),
                "olddata" : (JSON here),
                "actionID" : 2
            }
        },
        "comments" : {
            {
                "username" : "Matt Hamlin",
                "timestamp" : 1414880780,
                "content" : "This card is cool!",
                "commentparentID" : null,
                "commentID" : 1
            },
            {
                "username" : "Matt Hamlin",
                "timestamp" : 1414880785,
                "content" : "This comment is cool!",
                "commentparentID" : 1,
                "commentID" : 2
            }
        }
    }
}


-----------------------------------------------------------
            USERS
-----------------------------------------------------------
{
    {
        "username" : "matt hamlin",
        "userID" : 1,
        "useremail" : "hamlim@outlook.com",
        "columncolor" : "red",
        "isAdmin" : 1,
        "password" : "test"
    },
    {
        "username" : "Bob The-Builder",
        "userID" : 2,
        "useremail" : "bob_thebuilder@bob.bob",
        "columncolor" : "yellow",
        "isAdmin" : 0,
        "password" : "builder123"
    }
}

-----------------------------------------------------------
            Columns
-----------------------------------------------------------
{
    {
        "columnname" : "Jim",
        "columnID" : 1,
        "columnorder" : 75
    },
    {
        "columnname" : "Atticus",
        "columnID" : 2,
        "columnorder" : 46
    }
}

-----------------------------------------------------------
-----------------------------------------------------------
            







*/