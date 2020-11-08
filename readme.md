# Odos

Application for sharing geotagged travel photos with favorites list function.

## Ressources

- **User**
  - Username and/or email
  - Password
  - Registration date
- **Pictures of places**
  - Description
  - Geolocation
  - Picture
  - Creation date
  - Last modification date
  - Necessarily linked with a user
- **Favorites list**
  - List name
  - Creation date
  - Last modification date
  - Linked with pictures of places
  - Necessarily linked with a user
  - Public or private

![](https://github.com/Soraya97/odos/blob/master/images/odos.png)

## URLs

### User

| **Action**             | **Verb** | **Path**                                          | Comments              |
| ---------------------- | -------- | ------------------------------------------------- | --------------------- |
| See all users accounts | GET      | http://odos-archioweb.herokuapp.com/users         |                       |
| See my user account    | GET      | http://odos-archioweb.herokuapp.com/users/:userId | Must be authenticated |
| Add one user           | POST     | http://odos-archioweb.herokuapp.com/users         |                       |
| Modify one user        | PATCH    | http://odos-archioweb.herokuapp.com/users/:userId | Must be authenticated |
| Delete one user        | DELETE   | http://odos-archioweb.herokuapp.com/users/:userId | Must be authenticated |

### Pictures of places

| **Action**                            | **Verb** | **Path**                                                     | Comments              |
| ------------------------------------- | -------- | ------------------------------------------------------------ | --------------------- |
| See the feed                          | GET      | http://odos-archioweb.herokuapp.com/feed                     |                       |
| Filter the feed by pagination            | GET      | http://odos-archioweb.herokuapp.com/feed?page=X&pageSize=Y   |                       |
| Filter the feed by date_min            | GET      | http://odos-archioweb.herokuapp.com/feed?date_min=AAAA-MM-DD |                       |
| Filter the feed by date_max            | GET      | http://odos-archioweb.herokuapp.com/feed?date_max=AAAA-MM-DD |                       |
| See all pictures from a specific user | GET      | http://odos-archioweb.herokuapp.com/users/:userId/pictures   |                       |
| See one picture from a specific user  | GET      | http://odos-archioweb.herokuapp.com/users/:userId/pictures/:pictureId |                       |
| Add one picture                       | POST     | http://odos-archioweb.herokuapp.com/users/:userId/pictures   | Must be authenticated |
| Modify one picture                    | PATCH    | http://odos-archioweb.herokuapp.com/users/:userId/pictures/:pictureId | Must be authenticated |
| Delete one picture                    | DELETE   | http://odos-archioweb.herokuapp.com/users/:userId/pictures/:pictureId | Must be authenticated |

### Lists of favorites

| **Action**                 | **Verb** | **Path**                                                     | Comments              |
| -------------------------- | -------- | ------------------------------------------------------------ | --------------------- |
| See all my favorites lists | GET      | http://odos-archioweb.herokuapp.com/users/:userId/lists      | Must be authenticated |
| See one list               | GET      | http://odos-archioweb.herokuapp.com/users/:userId/lists/:listId | Must be authenticated |
| Add one list               | POST     | http://odos-archioweb.herokuapp.com/users/:userId/lists      | Must be authenticated |
| Modify one list            | PATCH    | http://odos-archioweb.herokuapp.com/users/:userId/lists/:listId | Must be authenticated |
| Delete one list            | DELETE   | http://odos-archioweb.herokuapp.com/users/:userId/lists/:listId | Must be authenticated |
| Delete a photo from a list | DELETE   | http://odos-archioweb.herokuapp.com/users/:userId/lists/:listId/picture/:pictureId | Must be authenticated |

## Authorization

### User

- You cannot see, edit, someone or delete else's data
- You cannot modify the creation dates

### Pictures of places

- You cannot post a photo on someone else's profile
- You cannot edit or delete someone else's photos
- You cannot modify the creation dates

### Lists of  favorites

- You cannot see someone else's private list
- You cannot post a list on someone else's profile
- You cannot edit or delete someone else's list
- You cannot add photos to someone else's list
- You cannot delete a photo from someone else's list
- You cannot modify the creation dates

## Documentation

It is possible to see the documentation of the API there: http://odos-archioweb.herokuapp.com/apiDoc

## Real-time API

- Feed: when a new pitcture is added, the feed is updated
- Photo counter: counter that updates as soon as a photo is added
