define({ "api": [
  {
    "type": "get",
    "url": "/feed",
    "title": "Feed of all pictures",
    "name": "RetrieveFeed",
    "group": "Feed",
    "version": "1.0.0",
    "description": "<p>Retrieves a paginated list of all pictures ordered by title (in alphabetical order).</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Number",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>The date of the picture's creation</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "last_mod_date",
            "description": "<p>The date at which the picture was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id which is referencing to the user who create the picture</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK",
          "content": " HTTP/1.1 200 OK\n Content-Type: application/json\n Link: https://odos-archioweb.herokuapp.com/feed?page=1&pageSize=1;\"\n\n[\n   {\n     \"location\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n           48.862725,\n           2.287592\n       ]\n   },\n     \"description\": \"1 picture\",\n     \"picture\": \"https://source.unsplash.com/random\",\n     \"creation_date\": \"2020-11-04T14:36:46.995Z\",\n     \"last_mod_date\": \"2020-11-04T14:36:46.995Z\",\n     \"userId\": \"5fa198479bb5b63b249b06af\",\n     \"id\": \"5fa2bc7ec26b8d62e8e1b205\"\n  },\n  {\n     \"location\": {\n       \"type\": \"Point\",\n       \"coordinates\": [\n           48.862725,\n           2.287592\n       ]\n  },\n     \"description\": \"2 picture\",\n     \"picture\": \"https://source.unsplash.com/random\",\n     \"creation_date\": \"2020-11-03T18:33:09.438Z\",\n     \"last_mod_date\": \"2020-11-03T18:33:09.438Z\",\n     \"userId\": \"5fa198479bb5b63b249b06af\",\n     \"id\": \"5fa1a265b941dc1f4096ced3\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "URL query parameters": [
          {
            "group": "URL query parameters",
            "type": "Date",
            "optional": true,
            "field": "min_date",
            "description": "<p>Select only pictures before this specified date</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Date",
            "optional": true,
            "field": "max_date",
            "description": "<p>Select only pictures after this specified date</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Which page to display</p>"
          },
          {
            "group": "URL query parameters",
            "type": "Number",
            "optional": true,
            "field": "pageSize",
            "description": "<p>How many items per page to display</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "GET /feed?page=1&pageSize=1 HTTP/1.1",
        "type": "json"
      }
    ],
    "filename": "routes/feed.js",
    "groupTitle": "Feed"
  },
  {
    "type": "post",
    "url": "/users/:userId/lists",
    "title": "Create a list",
    "name": "CreateList",
    "group": "List",
    "version": "1.0.0",
    "description": "<p>Create a new list.</p>",
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
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list (eg: <code>5fa50ef8ab605f53789adb8c</code>)</p>"
          }
        ]
      }
    },
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
            "description": "<p>An id which is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Vacances\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\"}\n }]",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /users/5f981e64eeac3042b0e27b86/lists HTTP/1.1\nContent-Type: application/json\n\n{\n  \"name\": \"Vacances\"\n}",
        "type": "json"
      }
    ],
    "filename": "routes/lists.js",
    "groupTitle": "List",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the List's properties are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"name\": ValidatorError: List name Party already exists {\n      \"properties\": [Object],\n      \"kind\": \"unique\",\n      \"path\": \"name\",\n      \"value\": \"Party\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"List validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
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
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
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
        "content": "DELETE /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620/picture/5fa50ef8ab605f53789adb8c HTTP/1.1",
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
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
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
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list (eg: <code>5fa50ef8ab605f53789adb8c</code>)</p>"
          }
        ],
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
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"name\": \"Plages\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n [{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Plages\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\"}\n }]",
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
            "description": "<p>An id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
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
            "description": "<p>An id which is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list</p>"
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
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the List's properties are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"name\": ValidatorError: List name Party already exists {\n      \"properties\": [Object],\n      \"kind\": \"unique\",\n      \"path\": \"name\",\n      \"value\": \"Party\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"List validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
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
        "content": "GET /users/5f981e64eeac3042b0e27b86/lists/5f98321aabf23b2cfce0fe76 HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f98321aabf23b2cfce0fe76\",\n   \"name\":\"Vacances\",\n   \"creationDate\":\"2020-10-27T14:43:38.484Z\",\n   \"modificationDate\":\"2020-10-27T14:43:38.485Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\"}\n }]",
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
            "description": "<p>An id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
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
            "description": "<p>An id which is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list</p>"
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
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
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
    "description": "<p>Retrieves a list of lists ordered by name (in alphabetical order).</p>",
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
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f9fc0c61704e25b2c33e410\",\n   \"name\":\"Chat\",\n   \"creationDate\":\"2020-11-02T08:18:14.908Z\",\n   \"modificationDate\":\"2020-11-02T08:18:14.908Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\"},\n {\n   \"picture\":[],\n   \"public\":true,\n   \"_id\":\"5f9fc06afa4bf011e030625c\",\n   \"name\":\"Party\",\n   \"creationDate\":\"2020-11-02T08:16:42.329Z\",\n   \"modificationDate\":\"2020-11-02T08:16:42.329Z\",\n   \"user\":\"5f981e64eeac3042b0e27b86\"}\n}]",
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
            "description": "<p>An id which is referencing the list (eg: <code>5f98321aabf23b2cfce0fe76</code>)</p>"
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
            "description": "<p>An id which is referencing to the user who create the list</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "pictureId",
            "description": "<p>An id which is referencing to the picture which is in the list</p>"
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
            "description": "<p>No List/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo list found with ID 5f98321aabf23b2cfce0fe76",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login of users",
    "name": "Login",
    "group": "LoginUser",
    "version": "1.0.0",
    "description": "<p>Login of users</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "/^[a-zA-Z0-9]+$/",
            "optional": false,
            "field": "username",
            "description": "<p>The username of the user</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "The",
            "description": "<p>password of the user  (that is hashed in db)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token of the user of the session (last 1 week)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "200 OK",
          "content": " HTTP/1.1 200 OK\n Content-Type: application/json\n\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Zjk4MWU2NGVlYWMzMDQyYjBlMjdiODYiLCJleHAiOjE2MDUyNzM5ODUuNDk5LCJpYXQiOjE2MDQ2NjkxODV9.HpC2MibTEzGBh2s21Otc6eAQZ2KGwbkqvO3XssHFhNA\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nUnauthorized",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": " POST /login HTTP/1.1\n Content-Type: application/json\n\n{\n   \"username\": \"Pomme\",\n   \"password\": \"Tre$B0n\"\n}",
        "type": "json"
      }
    ],
    "filename": "routes/auth.js",
    "groupTitle": "LoginUser"
  },
  {
    "type": "post",
    "url": "/users/:userId/pictures",
    "title": "Create a picture",
    "name": "CreatePicture",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Create a new Picture.</p>",
    "success": {
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>A unique identifier for the picture generated by the server</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Number",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>The date of the picture's creation</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "last_mod_date",
            "description": "<p>The date at which the picture was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id which is referencing to the user who create the picture</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://odos-archioweb.herokuapp.com/5fa50ef8ab605f53789adb8c\n\n{\n   \"description\": \"Plage de sable\",\n   \"location\": {\n     \"type\": \"Point\",\n      \"coordinates\": [\n         48.862725,\n         2.287592\n       ]\n    },\n   \"picture\": \"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg\",\n   \"creation_date\": \"2020-11-06T08:53:12.467Z\",\n   \"last_mod_date\": \"2020-11-06T08:53:12.467Z\",\n   \"userId\": \"5f981e64eeac3042b0e27b86\",\n   \"id\": \"5fa50ef8ab605f53789adb8c\"\n }",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example",
        "content": "POST /users/5f981e64eeac3042b0e27b86/pictures HTTP/1.1\nContent-Type: application/json\n\n{\n    \"description\": \"Plage de sable\",\n    \"location\":\n       {\n         \"type\": \"Point\",\n         \"coordinates\": [100.878393, 12.930719]\n       },\n     \"picture\":\"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg\"\n }",
        "type": "json"
      }
    ],
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "longitude/latitude",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
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
            "description": "<p>Some of the Picture's properties are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No Picture/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"location.coordinates\": ValidatorError: 12.930719, 100.878393 is not a valid longitude/latitude(/altitude) coordinates array {\n      \"properties\": [Object],\n      \"kind\": \"user defined\",\n      \"path\": \"location.coordinates\",\n      \"value\": \"[12.930719, 100.878393]\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"Picture validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo Picture found with ID 5fa50ef8ab605f53789adb8c",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:userId/pictures/:pictureId",
    "title": "Delete a picture",
    "name": "DeletePicture",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Permanently deletes a picture.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "DELETE /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1",
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
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the picture to retrieve</p>"
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
            "description": "<p>No Picture/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo Picture found with ID 5fa50ef8ab605f53789adb8c",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "patch",
    "url": "/users/:userId/pictures/:pictureId",
    "title": "Partially update a picture",
    "name": "PartiallyUpdatePicture",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Partially updates a picture's data (only the properties found in the request body will be updated). All properties are optional.</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          }
        ],
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the picture to retrieve</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example",
        "content": "PATCH /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1\nContent-Type: application/json\n\n{\n  \"description\": \"Plage de sable à Pattaya\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n   \"description\": \"Plage de sable à Pattaya\",\n    \"location\": {\n     \"type\": \"Point\",\n      \"coordinates\": [\n         48.862725,\n         2.287592\n       ]\n    },\n   \"picture\": \"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg\",\n   \"creation_date\": \"2020-11-06T08:53:12.467Z\",\n   \"last_mod_date\": \"2020-12-06T11:54:16.467Z\",\n   \"userId\": \"5f981e64eeac3042b0e27b86\",\n   \"id\": \"5fa50ef8ab605f53789adb8c\"\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Number",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>The date of the picture's creation</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "last_mod_date",
            "description": "<p>The date at which the picture was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id which is referencing to the user who create the picture</p>"
          }
        ]
      }
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "404/NotFound",
            "description": "<p>No Picture/User was found corresponding to the ID in the URL path</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "422/UnprocessableEntity",
            "description": "<p>Some of the Picture's properties are invalid</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo Picture found with ID 5fa50ef8ab605f53789adb8c",
          "type": "json"
        },
        {
          "title": "422 Unprocessable Entity",
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"location.coordinates\": ValidatorError: 12.930719, 100.878393 is not a valid longitude/latitude(/altitude) coordinates array {\n      \"properties\": [Object],\n      \"kind\": \"user defined\",\n      \"path\": \"location.coordinates\",\n      \"value\": \"[12.930719, 100.878393]\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"Picture validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:userId/pictures",
    "title": "Retrieve all pictures",
    "name": "RetrieveAllPictures",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Retrieves a list of picture ordered by picture (in alphabetical order).</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users/5f981e64eeac3042b0e27b86/pictures/ HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n[{\n   \"description\": \"Plage de sable\",\n   \"location\": {\n     \"type\": \"Point\",\n      \"coordinates\": [\n         48.862725,\n         2.287592\n       ]\n    },\n   \"picture\": \"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg\",\n   \"creation_date\": \"2020-11-06T08:53:12.467Z\",\n   \"last_mod_date\": \"2020-11-06T08:53:12.467Z\",\n   \"userId\": \"5f981e64eeac3042b0e27b86\",\n   \"id\": \"5fa50ef8ab605f53789adb8c\"\n },\n {\n   \"description\": \"Parc en Suisse\",\n   \"location\": {\n     \"type\": \"Point\",\n      \"coordinates\": [\n         50.52464,\n         2.1246\n       ]\n    },\n   \"picture\": \"https://www.coucoulasuisse.com/images/parc-national-suisse.jpg\",\n   \"creation_date\": \"2020-10-06T09:53:12.467Z\",\n   \"last_mod_date\": \"2020-10-06T09:53:12.467Z\",\n   \"userId\": \"5f981e64eeac3042b0e27b86\",\n   \"id\": \"5fa50ef8ab605f53798dddd8c\"\n }]",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Number",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>The date of the picture's creation</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "last_mod_date",
            "description": "<p>The date at which the picture was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id which is referencing to the user who create the picture</p>"
          }
        ]
      }
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the picture to retrieve</p>"
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
            "description": "<p>No Picture/User was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo Picture found with ID 5fa50ef8ab605f53789adb8c",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:userId/pictures/:pictureId",
    "title": "Retrieve a picture",
    "name": "RetrievePicture",
    "group": "Picture",
    "version": "1.0.0",
    "description": "<p>Retrieves one Picture.</p>",
    "examples": [
      {
        "title": "Example",
        "content": "GET /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200 OK",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n   \"description\": \"Plage de sable\",\n   \"location\": {\n     \"type\": \"Point\",\n      \"coordinates\": [\n         48.862725,\n         2.287592\n       ]\n    },\n   \"picture\": \"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg\",\n   \"creation_date\": \"2020-11-06T08:53:12.467Z\",\n   \"last_mod_date\": \"2020-11-06T08:53:12.467Z\",\n   \"userId\": \"5f981e64eeac3042b0e27b86\",\n   \"id\": \"5fa50ef8ab605f53789adb8c\"\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "size": "3...50",
            "optional": false,
            "field": "description",
            "description": "<p>The description of the picture (must be unique)</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>The location of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Number",
            "optional": false,
            "field": "coordinates",
            "description": "<p>Coordinates of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "picture",
            "description": "<p>The url of the picture</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "creation_date",
            "description": "<p>The date of the picture's creation</p>"
          },
          {
            "group": "Response body",
            "type": "Date",
            "optional": false,
            "field": "last_mod_date",
            "description": "<p>The date at which the picture was modified</p>"
          },
          {
            "group": "Response body",
            "type": "Schema.Types.ObjectId",
            "optional": false,
            "field": "userId",
            "description": "<p>An Id which is referencing to the user who create the picture</p>"
          }
        ]
      }
    },
    "filename": "routes/pictures.js",
    "groupTitle": "Picture",
    "parameter": {
      "fields": {
        "URL path parameters": [
          {
            "group": "URL path parameters",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The unique identifier of the picture to retrieve</p>"
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
            "description": "<p>No Picture/User was found corresponding to the ID in the URL path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "404 Not Found",
          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo Picture found with ID 5fa50ef8ab605f53789adb8c",
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
    "examples": [
      {
        "title": "Example",
        "content": "POST /users HTTP/1.1\nContent-Type: application/json\n\n{\n  \"username\": \"Pomme\",\n  \"email\": \"gateau@gmail.com\",\n  \"password\": \"Tre$B0n\"\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "201 Created",
          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86\n\n{\n  \"_id\": \"5f981e64eeac3042b0e27b86\",\n  \"username\": \"Pomme\",\n  \"email\": \"gateau@gmail.com\",\n  \"registrationDate\":\"2020-10-27T13:19:32.249Z\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Response body": [
          {
            "group": "Response body",
            "type": "String",
            "optional": false,
            "field": "userId",
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
            "description": "<p>The email of the user (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user that will be hashed</p>"
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
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"email\": ValidatorError: is invalid {\n      \"properties\": [Object],\n      \"kind\": \"regexp\",\n      \"path\": \"email\",\n      \"value\": \"lauraineemail\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"User validation failed\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/users/:userId",
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
            "field": "userId",
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
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
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
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/users/:userId",
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
            "field": "userId",
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
            "field": "userId",
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
    "url": "/users",
    "title": "Retrieve all users",
    "name": "RetrieveUsers",
    "group": "User",
    "version": "1.0.0",
    "description": "<p>Retrieves a list of users ordered by usernames (in alphabetical order).</p>",
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
            "field": "userId",
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
    "url": "/users/:userId",
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
            "field": "userId",
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
            "field": "userId",
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
            "description": "<p>The email of the user (must be unique)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The password of the user that will be hashed</p>"
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
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "403/Forbidden",
            "description": "<p>You're not allowed to do that</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "401/Unauthorized",
            "description": "<p>You're not allowed to do that</p>"
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
          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"errors\": {\n    \"email\": ValidatorError: is invalid {\n      \"properties\": [Object],\n      \"kind\": \"regexp\",\n      \"path\": \"email\",\n      \"value\": \"lauraineemail\",\n      \"reason\": undefined,\n      [Symbol(mongoose:validatorError)]: true\n    }\n  },\n \"_message\": \"User validation failed\"\n}",
          "type": "json"
        },
        {
          "title": "403 Forbidden",
          "content": "HTTP/1.1 403 Forbidden\nContent-Type: text/plain\n\nYou're not allowed to do that",
          "type": "json"
        },
        {
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nYou're not connected you don't have access",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "Add",
    "url": "/",
    "title": "Add a link to header",
    "name": "AddLink",
    "group": "Utils",
    "version": "1.0.0",
    "description": "<p>Adds a Link header to the response (if applicable).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resourceHref",
            "description": "<p>The hyperlink reference of the collection (e.g. &quot;/api/people&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>The page being listed</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageSize",
            "description": "<p>The page size</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>The total number of elements</p>"
          },
          {
            "group": "Parameter",
            "type": "ExpressResponse",
            "optional": false,
            "field": "res",
            "description": "<p>The Express response object</p>"
          }
        ]
      }
    },
    "filename": "routes/utils.js",
    "groupTitle": "Utils"
  },
  {
    "type": "get",
    "url": "/",
    "title": "Get the user by id",
    "name": "GetUser",
    "group": "Utils",
    "version": "1.0.0",
    "description": "<p>file where the functions that are used in multiple files are located</p>",
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
            "field": "401/Unauthorized",
            "description": "<p>Something went wrong</p>"
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
          "title": "401 Unauthorized",
          "content": "HTTP/1.1 401 Unauthorized\nContent-Type: text/plain\n\nAuthorization header is missing",
          "type": "json"
        }
      ]
    },
    "filename": "routes/utils.js",
    "groupTitle": "Utils"
  },
  {
    "type": "Parse",
    "url": "/",
    "title": "Parses the pagination parameters",
    "name": "ParsesParam",
    "group": "Utils",
    "version": "1.0.0",
    "description": "<p>Parses the pagination parameters (i.e. page &amp; page size) from the request.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "ExpressRequest",
            "optional": false,
            "field": "req",
            "description": "<p>The Express request object</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "return",
            "description": "<p>An object with &quot;page&quot; and &quot;pageSize&quot; properties</p>"
          }
        ]
      }
    },
    "filename": "routes/utils.js",
    "groupTitle": "Utils"
  }
] });
