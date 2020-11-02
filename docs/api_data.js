define({ "api": [
  {
    "type": "post",
    "url": "/users/id/lists",
    "title": "Create a list",
    "name": "CreateList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Create a new list.</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A unique identifier for the list generated by the server</p>"
          },
          {
            "group": "Response body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>The date at which the list was created</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "modificationDate",
            "description": "<p>The date at which the list was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Vacances\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\",\"__v\":0}\n }]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /users/5f981e64eeac3042b0e27b86/lists HTTP/1.1\nContent-Type: application/json\n\n{\n  \"name\": \"Vacances\",\n}",
        "type": "json"
      }
    ],
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "minlength: 3",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Request body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list (eg: <code>5f981e64eeac3042b0e27b86</code>)</p>"
          },
          {
            "group": "Request body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list (eg: <code>A CHANGER</code>)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the List's properties are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"name\": ValidatorError: List name Oarty already exists {\n      \"properties\": [Object],\n      \"kind\": \"unique\",\n      \"path\": \"name\",\n      \"value\": \"Party\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"List validation failed\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:userId/lists/:listId",
    "title": "Delete a list",
    "name": "DeleteList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Permanently deletes a list.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the list to retrieve</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo List found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:userId/lists/:listId/picture/:pictureId",
    "title": "Delete a picture from a list",
    "name": "DeletePictureList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Permanently deletes a picture from a list.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620/picture/5f981e64eeac3042b0e27b86 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the list to retrieve</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo List found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/users/:userId/lists/:listId",
    "title": "Partially update a list and add a picture",
    "name": "PartiallyUpdateList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Partially updates a list's data (only the properties found in the request body will be updated). All properties are optional.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"name\": Plages\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n [{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Plages\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\",\"__v\":0}\n }]",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>The date at which the list was created</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "modificationDate",
            "description": "<p>The date at which the list was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list</p>"
          }
        ]
      }
    },
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the list to retrieve</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "minlength: 3",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Request body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list (eg: <code>5f981e64eeac3042b0e27b86</code>)</p>"
          },
          {
            "group": "Request body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list (eg: <code>A CHANGER</code>)</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the List's properties are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo List found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"name\": ValidatorError: List name Oarty already exists {\n      \"properties\": [Object],\n      \"kind\": \"unique\",\n      \"path\": \"name\",\n      \"value\": \"Party\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"List validation failed\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:userId/lists/:listId",
    "title": "Retrieve a list",
    "name": "RetrieveList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Retrieves one list.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Vacances\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\",\"__v\":0}\n }]",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>The date at which the list was created</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "modificationDate",
            "description": "<p>The date at which the list was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list</p>"
          }
        ]
      }
    },
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the list to retrieve</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo List found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:userId/lists",
    "title": "Retrieve all lists",
    "name": "RetrieveLists",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Retrieves a list of lists</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users/5f981e64eeac3042b0e27b86/lists HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f9fc0c61704e25b2c33e410\",\n   \"name\":\"Chat\",\n   \"creationDate\":\"2020-11-02T08:18:14.908Z\",\n   \"modificationDate\":\"2020-11-02T08:18:14.908Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\",\"__v\":0},\n {\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f9fc06afa4bf011e030625c\",\n   \"name\":\"Party\",\n   \"creationDate\":\"2020-11-02T08:16:42.329Z\",\n   \"modificationDate\":\"2020-11-02T08:16:42.329Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\",\"__v\":0}\n}]",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "Boolean",
            "size": "default: false",
            "optional": false,
            "field": "public",
            "description": "<p>Make the list private or public</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the list</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creationDate",
            "description": "<p>The date at which the list was created</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "modificationDate",
            "description": "<p>The date at which the list was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id who is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An Id who is referencing to the picture who is in the list</p>"
          }
        ]
      }
    },
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo List found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create an user",
    "name": "CreateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Create a new user.</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A unique identifier for the user generated by the server</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "registrationDate",
            "description": "<p>The date at which the user was created</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86\n\n{\n  \"_id\": \"5f981e64eeac3042b0e27b86\",\n  \"username\": \"Pomme\",\n  \"email\": \"gateau@gmail.com\",\n  \"registrationDate\":\"2020-10-27T13:19:32.249Z\"\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /users HTTP/1.1\nContent-Type: application/json\n\n{\n  \"username\": \"Pomme\",\n  \"email\": \"gateau@gmail.com\",\n  \"password\": \"Tre$B0n\"\n}",
        "type": "json"
      }
    ],
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user (must match an email form, must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user that is put in hash</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the User's properties are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  A corriger\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete an user",
    "name": "DeleteUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Permanently deletes an user.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/5f981e64eeac3042b0e27b86 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "204 No Content",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the user to retrieve</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No User was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo User found with ID 5f981e64eeac3042b0e27b86",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Retrieve a user",
    "name": "RetrieveUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Retrieve one user</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users/5f981e64eeac3042b0e27b86 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"_id\": \"5f981e64eeac3042b0e27b86\",\n  \"username\": \"Pomme\",\n  \"email\": \"gateau@gmail.com\",\n  \"registrationDate\":\"2020-10-27T13:19:32.249Z\"\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the user (eg: <code>5f981e64eeac3042b0e27b86</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "registrationDate",
            "description": "<p>The date at which the user was created</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the user to retrieve</p>"
          }
        ],
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>Embed linked resources in the response body:</p> <ul> <li><code>&quot;username&quot;</code> for the user's username</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No User was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo User found with ID 5f981e64eeac3042b0e27b86",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Retrieve all users",
    "name": "RetrieveUsers",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Retrieves a paginated??? list of users ordered by usernames???? (in alphabetical order).</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n [{\n     \"_id\":\"5f981e64eeac3042b0e27b86\",\n     \"username\":\"Pomme\",\n     \"email\":\"gateau@gmail.com\",\n     \"registrationDate\":\"2020-10-27T13:19:32.249Z\"\n },\n {\n     \"_id\":\"5f85a58eb731925bec4aee2d\",\n     \"username\":\"tata\",\n     \"email\":\"abc@hhh.ch\",\n     \"registrationDate\":\"2020-10-13T13:03:10.304Z\"\n  }]",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the user (eg: <code>5f981e64eeac3042b0e27b86</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "registrationDate",
            "description": "<p>The date at which the user was created</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "String",
            "optional": true,
            "field": "include",
            "description": "<p>Embed linked resources in the response body:</p> <ul> <li><code>&quot;username&quot;</code> for the user's username</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No User was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo User found with ID 5f981e64eeac3042b0e27b86",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Partially update an user",
    "name": "UpdateUser",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Partially updates a user's data (only the properties found in the request body will be updated).</p>",
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/58b2926f5e1def0123e97bc0 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"username\": \"Poire\",\n  \"password\": \"Tre$M4uvais\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  \"_id\": \"58b2926f5e1def0123e97bc0\",\n  \"username\": \"Poire\",\n  \"email\": \"gateau@gmail.com\",\n  \"registrationDate\":\"2020-10-27T13:19:32.249Z\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>An Id which is referencing the user (eg: <code>5f981e64eeac3042b0e27b86</code>)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "registrationDate",
            "description": "<p>The date at which the user was created</p>"
          }
        ]
      }
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the user to retrieve</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "/\\S+@\\S+\\.\\S+/",
            "optional": false,
            "field": "email",
            "description": "<p>The email of the user (must match an email form, must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user that is put in hash</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the User's properties are invalid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo User found with ID 5f981e64eeac3042b0e27b86",
          "type": "json"
        },
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  A corriger\n}",
          "type": "json"
        }
      ]
    }
  }
] });
